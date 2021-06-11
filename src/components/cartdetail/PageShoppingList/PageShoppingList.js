import { computed, inject, ref, onMounted } from '@vue/composition-api';
import { selectCurrentUser } from '../../../composition/selectors';
import { SHOPPING_LIST } from '../../../composition/useShoppingList';
import useStore from '../../../composition/useStore';
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner.vue';

export default {
  components: {
    LoadingSpinner,
  },
  setup(props,ctx) {
    const currentUser = useStore(ctx,selectCurrentUser)
    const sharedLists = ref(null)
    const {
      shoppingLists,
      removeList,
      getSharedLists,
    } = inject(SHOPPING_LIST);
    const isLoading = computed(
      ()=>!(shoppingLists.value)
    )
    const shoppingListNotEmpty = computed(
      ()=>(shoppingLists.value?.length||0)>0
    )
    const sharedNotEmpty = computed(
      ()=>(sharedLists.value?.length||0)>0
    )
    onMounted(()=>{
      if(!currentUser.value){
        return
      }
      getSharedLists(currentUser.value).then(
        (result)=>{
          sharedLists.value=result
        }
      )
  
    })
    return {
      shoppingLists,
      isLoading,
      shoppingListNotEmpty,
      sharedNotEmpty,
      sharedLists,
      removeList
    }
  },
  methods: {
    deleteList(list) {
      this.removeList(list)
    }
  }
};
