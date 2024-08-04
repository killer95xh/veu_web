<template>
  <div class="header-layout">
    <svg @click="routerPush('EmployeeManager')" xmlns="http://www.w3.org/2000/svg" width="32" height="32"
      viewBox="0 0 32 32" fill="none">
      <path
        d="M18.3513 22.6485C18.0331 22.6482 17.7281 22.5216 17.5033 22.2965L12.0033 16.7965C11.7786 16.5715 11.6523 16.2665 11.6523 15.9485C11.6523 15.6305 11.7786 15.3255 12.0033 15.1005L17.3953 9.70446C17.6203 9.47974 17.9253 9.35352 18.2433 9.35352C18.5613 9.35352 18.8663 9.47974 19.0913 9.70446C19.2032 9.81595 19.2919 9.94841 19.3525 10.0943C19.4131 10.2401 19.4442 10.3965 19.4442 10.5545C19.4442 10.7124 19.4131 10.8688 19.3525 11.0146C19.2919 11.1605 19.2032 11.293 19.0913 11.4045L14.5633 15.9485L19.2153 20.6005C19.44 20.8255 19.5662 21.1305 19.5662 21.4485C19.5662 21.7665 19.44 22.0715 19.2153 22.2965C19.1021 22.4098 18.9673 22.4994 18.8189 22.5599C18.6705 22.6203 18.5115 22.6504 18.3513 22.6485Z"
        fill="#696868" />
    </svg>
    <span class="text-header-layout">Chỉnh sửa thông tin nhân viên</span>
  </div>
  <div class="content-layout">
    <form action="#" class="form-my-control">
      <table class="mar-t-10">
        <tr>
          <td class="title-upload-avatar tdLabel"><label for="img_user" class="label">Ảnh đại diện</label>
          </td>
          <td>
            <label class="custom-file-upload custom-img-show" :style="'background-image: url(' + convertUrlAvatar(url_avatar) + ')'"> <!-- Show avatar vao class custom-file-upload -->
              <input class="display-none" type="file" id="uploadImage" @change="myChanImg($event)"/>
              <div id="style-div-img-upload-avatar" class="style-div-img-upload-avatar">
                <img id="img-upload-avatar" class="img-upload-avatar" src="@/assets/images/may-anh.svg" alt="">
                <img id="uploadPreview" style="width: 1px; height: 1px;" />
              </div>
            </label>
          </td>
        </tr>
        <tr>
          <td class="tdLabel">
            <label for="ho" class="label">Họ <span class="text-red">*</span></label>
          </td>
          <td>
            <input v-model="first_name" type="text" id="first_name" />
          </td>
        </tr>
        <tr>
          <td class="tdLabel">
            <label for="ten" class="label">Tên <span class="text-red">*</span></label>
          </td>
          <td>
            <input type="text" v-model="last_name" id="last_name" />
          </td>
        </tr>
        <tr>
          <td class="tdLabel">
            <label for="user_name" class="label">Tên Đăng Nhập <span class="text-red">*</span></label>
          </td>
          <td>
            <input type="text" v-model="user_name" id="user_name" />
          </td>
        </tr>
        <tr>
          <td class="tdLabel">
            <label for="password" class="label">Mật khẩu <span class="text-red">*</span></label>
          </td>
          <td>
            <input type="password" v-model="password" id="password" />
          </td>
        </tr>
        <tr>
          <td class="tdLabel">
            <label for="email" class="label">email <span class="text-red">*</span></label>
          </td>
          <td>
            <input type="text" v-model="email" id="email" />
          </td>
        </tr>
        <tr>
          <td class="tdLabel">
            <label for="chuc_vu" class="label">Chức vụ</label>
          </td>
          <td>
            <input type="text" v-model="position" id="position" />
          </td>
        </tr>
        <tr>
          <td class="tdLabel">
            <label for="tinh_trang" class="label">Tình trạng</label>
          </td>
          <td>
            <select name="" v-model="employment_state" id="tinh_trang" class="select-oceanlink">
              <option value="1">Đang làm việc</option>
              <option value="0">Đã nghỉ việc</option>
            </select>
          </td>
        </tr>
      </table>
      <div class="group-btn-submit">
        <button @click.prevent="routerPush('EmployeeManager')" class="btn my-btn-cancel"><span>Hủy bỏ</span></button>
        <button @click.prevent="updateUser()" class="btn my-btn-success"><span>Cập nhật</span></button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { inject, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import service from "../services/service"
import $ from 'jquery'
import Swal from 'sweetalert2'
import helper from '@/services/helper'

const route = useRoute()
const router = useRouter()
const Constant = inject("$constant")
const isLoading = inject('isLoading')

//params update
const avatar = ref(null)
const url_avatar = ref("")
const first_name = ref("")
const last_name = ref("")
const user_name = ref("")
const password = ref("************")
const email = ref("")
const position = ref("")
const employment_state = ref("")

const updateUser = async () => {
  $('.error').remove();
  $('.input-change-border-error').removeClass("input-change-border-error border-top border-2 border-danger");
  let url = process.env.VUE_APP_BASE_URL_API + '/' + Constant.pathUpdateUser
  let headers = {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token')).token}`,
    'content-type': 'multipart/form-data',
  }
  let params = {
    id: userId,
    avatar: avatar.value,
    first_name: first_name.value,
    last_name: last_name.value,
    user_name: user_name.value,
    email: email.value,
    position: position.value,
    employment_state: employment_state.value,
    password: password.value
  }
  isLoading.value = true
  const response = await service.post(url, params, headers)
  isLoading.value = false
  if (response.status == 200) {
    if (response.data.returnCode == 200) {
      Swal.fire('Thành Công', 'Sửa thông tin thành công!', 'success').then((result) => {
        if (result.isConfirmed) {
          routerPush("EmployeeManager")
        }
      })
    } else {
      Swal.fire('Thất bại', 'Sửa thông tin thất bại!', 'error');
    }
  } else if (response.status == 422) {
    $.each(response.data.data, function (key, value) {
      $('input[id=' + key + ']').parent().append('<p class="error padd-l-15 padd-t-2" style="color: red; text-align: left; font-size: 12px">' + value + '</p>');
      $('input[id=' + key + ']').addClass("input-change-border-error border-top border-2 border-danger");
    });
  }
}

const userId = route.params.userId
const getUserInfo = async (userId) => {
  let url = process.env.VUE_APP_BASE_URL_API + '/' + Constant.pathGetUserInfo + '/' + userId
    let headers = {
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token')).token}`,
    }
    isLoading.value = true
    const response = await service.get(url, {}, headers);
    isLoading.value = false
    if (response.data.returnCode == "200") {
      first_name.value = response.data.data.user.first_name
      url_avatar.value = response.data.data.user.url_avatar
      last_name.value = response.data.data.user.last_name
      user_name.value = response.data.data.user.user_name
      email.value = response.data.data.user.email
      position.value = response.data.data.user.position
      employment_state.value = response.data.data.user.employment_state
    }
}
getUserInfo(userId)

const routerPush = (name, params = {}) => {
  router.push({
    name,
    params
  })
}

const myChanImg = async (event) => {
  avatar.value = event.target.files[0]
  var oFReader = new FileReader();
    oFReader.readAsDataURL(document.getElementById("uploadImage").files[0]);

    oFReader.onload = function (oFREvent) {
        document.getElementById("uploadPreview").src = oFREvent.target.result;
    };
    $("#uploadPreview").addClass("show-img-avatar");
    $("#style-div-img-upload-avatar").addClass("bg-none");
    $("#img-upload-avatar").addClass("display-none");
    var imageUrl = '';
    $('.custom-file-upload').css('background-image', 'url(' + imageUrl + ')');
}

const convertUrlAvatar = (url) => {
  var url_avatar = ""
  if (url != "" && url != null && url != undefined) {
    url_avatar = helper.getPathImage(url)
  } else {
    url_avatar = require('@/assets/images/avatar.png')
  }
  return url_avatar
}
</script>
<style scoped></style>