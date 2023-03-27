export default {
  props: {
    sku: {
      type: String,
      required: true,
    },
    quickview: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    productImages() {
      return [this.product.images];
    },
    productImage() {
      const img =
        "https://live.staticflickr.com/65535/17309474945_5bd5f63af8_b.jpg";
      if (img) {
        return img.replace(/_medium.jpg$/, "_large.jpg");
      }
      return undefined;
    },
    zoomerImages() {
      const imageInfos = this.productImages.map((image, index) => ({
        id: index,
        url: image.url,
      }));
      return {
        thumbs: imageInfos,
        normal_size: imageInfos,
        // large_size: imageInfos,
      };
    },
    zoomerOptions() {
      return {
        zoomFactor: 3,
        pane: "container",
        hoverDelay: 300,
        namespace: "product-gallery",
        move_by_click: true,
        scroll_items: this.galleryThumbnailsCount,
        choosed_thumb_border_color: "#FEC14E",
        scroller_position: "bottom",
      };
    },
    galleryThumbnailsCount() {
      return Math.min(this.productImages.length, 3);
    },
  },
};
