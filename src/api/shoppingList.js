/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
import {
  withToken,
  groupApi,
  fetchJson,
  makeConfig,
  baseUrl,
} from "./api";
// import config from "../../sunrise.config";
// import { locale } from "../components/common/shared";
const cache = new Map();
const groupFetchJson = groupApi(fetchJson,cache);
const resetCache = ()=>cache.clear();
const get = withToken((query={},accessToken) => {
  const url = new URL(`${baseUrl}/me/shopping-lists`);
  if(query.name){
    url.searchParams.append('where', `name(en="${query.name}")`)
  }
  if(query.email){
    url.searchParams.append(
      'where', 
      `custom(fields(share contains all ("${query.email}")))`
    )
  }
  return groupFetchJson(
    url,
    makeConfig(accessToken)
  );
});
//you need to create the type, you can do in playground -> Types endpoint ->
//  Create with the following json:
// {
//   "key":"share",
//   "name":{"en":"share"},
//   "resourceTypeIds":["shopping-list"],
//   "fieldDefinitions":[
//     {
//       "type":{
//         "name": "Set",
//         "elementType":{
//           "name":"String"
//         }
//       },
//       "name":"share",
//       "label":{"en":"share"},
//       "required":false,
//       "inputHint":"SingleLine"
//     }
//   ]
// }
const setListCustom = withToken((list,accessToken) => {
  return groupFetchJson(
    new URL(`${baseUrl}/me/shopping-lists/${list.id}`),
    {
      method: "POST",
      body: JSON.stringify({
        version:list.version,
        actions: [
          {
            action: "setCustomType",
            type:{key:"share"}
          },
        ],
      }),
      ...makeConfig(accessToken),
    }
  );
});
const setListCustomField = withToken(([list,value,name],accessToken) => {
  return groupFetchJson(
    new URL(`${baseUrl}/me/shopping-lists/${list.id}`),
    {
      method: "POST",
      body: JSON.stringify({
        version:list.version,
        actions: [
          {
            action: "setCustomField",
            name,
            value
          },
        ],
      }),
      ...makeConfig(accessToken),
    }
  );
});
const shareList = (email,list) =>{
  let promise = Promise.resolve(list);
  if(!list?.custom?.fields?.share){
    promise = setListCustom(list)
  }
  return promise.then(
    (result)=>{
      const value = [
        ...new Set((result.custom.fields?.share||[]).concat(email))
      ]
      return setListCustomField([result,value,'share'])
    }
  )
}
const shoppingList = {
  get,
  shareList,
  create: withToken((query,accessToken) => {
    return groupFetchJson(
      new URL(`${baseUrl}/me/shopping-lists`),
      {
        method: "POST",
        body: JSON.stringify({
          key: query.name,
          name: {
            en: query.name,
          },
        }),
        ...makeConfig(accessToken),
      }
    );
  }),
  remove: withToken((list,accessToken) => {
    return groupFetchJson(
      new URL(`${baseUrl}/me/shopping-lists/${list.id}?version=${list.version}`),
      {
        method: "DELETE",
        ...makeConfig(accessToken),
      }
    );
  }),
  setQuantity: withToken(
    ([sku, quantity, listId, version, lineItemId], accessToken) => {
      return groupFetchJson(
        new URL(`${baseUrl}/me/shopping-lists/${listId}`),
        {
          method: "POST",
          body: JSON.stringify({
            version,
            actions: [
              {
                action: "changeLineItemQuantity",
                lineItemId,
                quantity,
                sku
              },
            ],
          }),
          ...makeConfig(accessToken),
        }
      );
    }
  ),
  addItem: withToken(
    ([sku, quantity, listId, version], accessToken) => {
      return groupFetchJson(
        new URL(`${baseUrl}/me/shopping-lists/${listId}`),
        {
          method: "POST",
          body: JSON.stringify({
            version,
            actions: [
              {
                action: "addLineItem",
                quantity,
                sku
              },
            ],
          }),
          ...makeConfig(accessToken),
        }
      );
    }
  ),
  removeItem: withToken(
    ([lineItemId, listId, version], accessToken) => {
      return groupFetchJson(
        new URL(`${baseUrl}/me/shopping-lists/${listId}`),
        {
          method: "POST",
          body: JSON.stringify({
            version,
            actions: [
              {
                action: "removeLineItem",
                lineItemId,
              },
            ],
          }),
          ...makeConfig(accessToken),
        }
      );
    }
  ),
  resetCache
};

export default shoppingList;
