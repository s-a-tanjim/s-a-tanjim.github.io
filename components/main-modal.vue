<template>
  <div>
    <!--<button
      style="display: none"
      data-toggle="modal"
      data-target="#Modal"
      ref="modalLaunchBtn"
    ></button>-->
    <div
      class="modal fade"
      id="MainModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="MainModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="ModalLabel">
              {{ data.title ? data.title : '' }}
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img
              :src="data.img_src ? data.img_src : ''"
              class="modal-img"
              :alt="data.title ? data.title : ''"
            />
            <p class="my-4" style="color: #111 !important">
              {{ data.description ? data.description : '' }}
            </p>
            <p style="color: #111 !important" v-if="data && data.project_link">
              Project link:
              <a :href="data.project_link" target="_blank">here</a>
            </p>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['data'],
  methods: {
    openModal() {
      if (window && window.$ && window.$('#MainModal')) {
        window.$('#MainModal').modal('show')
      }
    },
  },
}
</script>

<style scoped>
.modal-title {
  color: #111 !important;
}
.modal-img {
  max-width: 550px;
  max-height: 400px;
  object-fit: cover;
  width: 100%;
}
</style>