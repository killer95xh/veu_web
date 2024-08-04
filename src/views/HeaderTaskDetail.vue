<template>
  <div class="header-detail position-relative">
    <span class="header-layout bg-back-page" @click="routerPush('Task')">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path
          d="M18.3513 22.6485C18.0331 22.6482 17.7281 22.5216 17.5033 22.2965L12.0033 16.7965C11.7786 16.5715 11.6523 16.2665 11.6523 15.9485C11.6523 15.6305 11.7786 15.3255 12.0033 15.1005L17.3953 9.70446C17.6203 9.47974 17.9253 9.35352 18.2433 9.35352C18.5613 9.35352 18.8663 9.47974 19.0913 9.70446C19.2032 9.81595 19.2919 9.94841 19.3525 10.0943C19.4131 10.2401 19.4442 10.3965 19.4442 10.5545C19.4442 10.7124 19.4131 10.8688 19.3525 11.0146C19.2919 11.1605 19.2032 11.293 19.0913 11.4045L14.5633 15.9485L19.2153 20.6005C19.44 20.8255 19.5662 21.1305 19.5662 21.4485C19.5662 21.7665 19.44 22.0715 19.2153 22.2965C19.1021 22.4098 18.9673 22.4994 18.8189 22.5599C18.6705 22.6203 18.5115 22.6504 18.3513 22.6485Z"
          fill="#696868"></path>
      </svg>
    </span>
    <input v-if="is_update_task == 'project_name'" v-model="update_task_project_name" ref="input_project_name" type="text"
      class="form-control-cskh col-md-3" placeholder="Nhập tên dự án">
    <h3 v-else
      @click="UserStore.user.is_admin == '1' || UserStore.user.id == task.task_supervisor_user_id ? changeFieldUpdate('project_name', 10) : ''"
      class="title-detail-h"
      :class="UserStore.user.is_admin == '1' || UserStore.user.id == task.task_supervisor_user_id ? 'edit-bg-ocean-title cursor-pointer' : ''">
      {{ task.customer_name }} - {{ task.project_name }}
    </h3>
    <span
      v-if="UserStore.user.is_admin == '1' || UserStore.user.id == task.ads_user_id || UserStore.user.id == task.sale_user_id"
      class="span-detail-title" data-toggle="modal" data-target="#createSubTaskModal-thongtin-kh">
        Thông tin khách hàng
    </span>
    <div v-if="UserStore.user.is_admin == '1' || UserStore.user.id == task.task_supervisor_user_id" class="custom-bg-swal">
      <div @click="duplicateTask()" id="button-duplicate-task">Nhân bản</div>
      <img @click="deleteTask()" id="button-delete-task" src="@/assets/images/thungrac.svg" alt="">
    </div>
  </div>
  <!-- Modal thong tin khach hang -->
  <div class="modal fade" id="createSubTaskModal-thongtin-kh" tabindex="-1" role="dialog"
    aria-labelledby="createSubTaskModalLabel-kh" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="createSubTaskModalLabel-kh">Thông tin khách hàng</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="content-thongtin-kh">
            <div class="row-detail display-flex">
              <div class="text-row no-padding text-row-detail">
                <p>Tên khách hàng</p>
              </div>
              <div class="text-row-right text-row-detail">
                <span>{{ task.customer_name }}</span>
              </div>
            </div>
            <div class="row-detail display-flex">
              <div class="text-row no-padding text-row-detail">
                <p>Tên Công Ty</p>
              </div>
              <div class="text-row-right text-row-detail">
                <span>{{ task.company_name }}</span>
              </div>
            </div>
            <div class="row-detail display-flex">
              <div class="text-row no-padding text-row-detail">
                <p>Số điện thoại</p>
              </div>
              <div class="text-row-right text-row-detail">
                <span>{{ task.phone_number }}</span>
              </div>
            </div>
            <div class="row-detail display-flex">
              <div class="text-row no-padding text-row-detail">
                <p>Email</p>
              </div>
              <div class="text-row-right text-row-detail">
                <span>{{ task.email }}</span>
              </div>
            </div>
            <div class="row-detail display-flex">
              <div class="text-row no-padding text-row-detail">
                <p>Địa chỉ</p>
              </div>
              <div class="text-row-right text-row-detail">
                <span>{{ task.address }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- End Modal thong tin khach hang -->
</template>

<script setup>
import { computed, inject, onBeforeUnmount, onMounted, ref, watch, watchEffect } from "vue"
import service from "../services/service"
import { useRoute, useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import { userStore } from "../store/modules/userStore"

const props = defineProps(['task'])
const emit = defineEmits(['getTaskInfo'])

const UserStore = userStore()
const route = useRoute()
const router = useRouter()
const Constant = inject("$constant")
const isLoading = inject('isLoading')

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

const task_id = ref(null)

const input_project_name = ref(null);
const handleClickOutside = (event) => {
  if (is_update_task.value == "project_name") {
    if (input_project_name.value && !input_project_name.value.contains(event.target)) {
      if (update_task_project_name.value == props.task.project_name) {
      changeFieldUpdate("project_name", 5)
      } else {
        updateTask()
      }
    }
  }
}

const changeFieldUpdate = (fieldUpdate, time) => {
  setTimeout(() => {
    is_update_task.value = is_update_task.value == fieldUpdate ? '' : fieldUpdate
  }, time)
}

const is_update_task = ref("")
const update_task_project_name = ref("")
const updateTask = async () => {
  let url = process.env.VUE_APP_BASE_URL_API + '/' + Constant.pathUpdateTask
  let headers = {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token')).token}`
  }
  let params = {
    id: task_id.value
  }
  if (is_update_task.value == "project_name") {
    params.project_name = update_task_project_name.value
  }
  isLoading.value = true
  const response = await service.put(url, params, headers)
  isLoading.value = false
  is_update_task.value = ""
  if (response.status == 200) {
    if (response.data.returnCode == 200) {
      emit('getTaskInfo',task_id.value)
    } else {
      Swal.fire('Thất bại', 'Thao tác thất bại!', 'error');
    }
  }
}

const duplicateTask = async () => {
  Swal.fire({
    title: 'Nhân bản dự án',
    text: `Bạn có chắc chắn muốn nhân bản dự án ${props.task.project_name}?`,
    icon: 'question',
    showCancelButton: true,
    showConfirmButton: true,  
    confirmButtonText: 'Nhân bản',
    cancelButtonColor: '#E0E0E0',
    cancelButtonText: 'Hủy bỏ',
  }).then(async (result) => {
    if (result.isConfirmed) {
      let url = process.env.VUE_APP_BASE_URL_API + '/' + Constant.pathDuplicateTask
      let headers = {
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token')).token}`
      }
      let params = {
        id: task_id.value
      }
      isLoading.value = true
      const response = await service.post(url, params, headers)
      isLoading.value = false
      if (response.status == 200) {
        if (response.data.returnCode == 200) {
          routerPush('Task')
          Swal.fire('Thành công', `Nhân bản dự án ${props.task.project_name}!`, 'success')
        } else {
          Swal.fire('Thất bại', 'Thao tác thất bại!', 'error');
        }
      }
    }
  });
}

const deleteTask = async () => {
  Swal.fire({
    title: 'Xóa dự án',
    text: `Bạn có chắc chắn muốn xóa dự án ${props.task.project_name}?`,
    icon: 'question',
    showCancelButton: true,
    showConfirmButton: true,  
    confirmButtonText: 'Xóa',
    cancelButtonColor: '#E0E0E0',
    cancelButtonText: 'Không xóa',
    customClass:  'my-confirm-header-task-detail'
  }).then(async (result) => {
    if (result.isConfirmed) {
      let url = process.env.VUE_APP_BASE_URL_API + '/' + Constant.pathDeleteTask
      let headers = {
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token')).token}`
      }
      let params = {
        id: task_id.value
      }
      isLoading.value = true
      const response = await service.delete(url, params, headers)
      isLoading.value = false
      if (response.status == 200) {
        if (response.data.returnCode == 200) {
          routerPush('Task')
          Swal.fire('Thành công', `Xóa dự án ${props.task.project_name}!`, 'success')
        } else {
          Swal.fire('Thất bại', 'Thao tác thất bại!', 'error');
        }
      }
    }
  });
}

watchEffect(() => {
  update_task_project_name.value = props.task.project_name
  task_id.value = props.task.task_id
});

const routerPush = (name, params = {}) => {
  router.push({
    name,
    params
  })
}
</script>

<style scoped>
  #button-delete-task {
    position: absolute;
    right: 15px;
    cursor: pointer;
    height: 30px;
    top: 11px;
  }

  #button-duplicate-task {
    position: absolute;
    right: 60px;
    cursor: pointer;
    height: 30px;
    top: 11px;
    display: flex;
    width: 8%;
    font-size: 14px;
    padding: 5px 0 7px 0;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    border-radius: 6px;
    color: #fff;
    background: #00A5DC;
  }
</style>