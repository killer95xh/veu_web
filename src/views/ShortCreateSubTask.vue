<template>
  <div class="mar-t-10">
    <div @click="check_show_short_create = !check_show_short_create" type="button" style="width: 100%"
      class="title-detail">
      <span class="d-flex" style="justify-content: space-between;">Tạo nhanh công việc
        <svg style="margin: 10px 10px 0 0" xmlns="http://www.w3.org/2000/svg" width="13" height="7" viewBox="0 0 13 7"
          fill="none">
          <path v-if="check_show_short_create"
            d="M6.05348 0.146729L0.160625 5.53542C-0.053661 5.73135 -0.0536761 6.41649 0.16061 6.61242C0.374895 6.80835 1.39277 6.80891 1.60705 6.61299L6.42848 2.20406L11.2499 6.61299C11.4642 6.80891 12.2682 6.80858 12.4825 6.61265C12.6968 6.41672 12.9106 5.73135 12.6963 5.53542L6.80348 0.146729C6.69634 0.0487652 6.5892 -0.000234604 6.42848 -0.000234604C6.26777 -0.000234604 6.16062 0.0487652 6.05348 0.146729Z"
            fill="#656569" />
          <path v-else
            d="M6.05348 6.61773L0.160625 1.22521C-0.053661 1.02914 -0.0536761 0.343519 0.16061 0.147452C0.374895 -0.0486159 1.39277 -0.0491836 1.60705 0.146884L6.42848 4.55895L11.2499 0.146884C11.4642 -0.0491836 12.2682 -0.04885 12.4825 0.147218C12.6968 0.343285 12.9106 1.02914 12.6963 1.22521L6.80348 6.61773C6.69634 6.71577 6.5892 6.7648 6.42848 6.7648C6.26777 6.7648 6.16062 6.71577 6.05348 6.61773Z"
            fill="#656569" />
        </svg>
      </span>
    </div>
    <div v-if="check_show_short_create">
      <div class="mar-t-10">
        <div type="button" @click.prevent="emit('createSubTaskAds')" class="btn-chay-ads">
          <span>Chạy Ads</span>
        </div>
      </div>
      <div class="mar-t-10">
        <div class="form-div">
          <div class="title-create-subtask">
            <span>Tên công việc </span><span class="text-red">*</span>
          </div>
          <div class="form-control-create-subtask">
            <input id="sub_task_name-3" v-model="sub_task_name" type="text" class="form-control-cskh"
              placeholder="Tên công việc">
          </div>
        </div>
        <div ref="input_leader" class="form-div">
          <div class="title-create-subtask">
            <span>Trưởng phòng </span><span class="text-red">*</span>
          </div>
          <div class="form-control-create-subtask content-detail-right display-flex">
            <div class="content-cskh icon-content-cskh" style="width: 100%;">
              <div id="leader_user_id-3" type="text" class="form-control-cskh padd-4" @click.stop="toggleTP()">
                <input id="input-value-tp" type="hidden">
                <img src="@/assets/images/book.svg" alt="">
              </div>
              <div id="myDropdown-tp-ocean-3" class="dropdown-content-ocean">
                <div class="position-relative div-search-ocean">
                  <input type="text" id="myInput-search-tp-3" class="input-search-ocean"
                    @keyup="filterFunction('#myInput-search-tp-3', '#myDropdown-tp-ocean-3 li')">
                </div>
                <div class="list-item-search-ocean">
                  <li v-for="user in allUser"
                    @click="addText('#leader_user_id-3', '#input-value-tp', '#myDropdown-tp-ocean-3', `[${user.position}] ${user.last_name}`), leader_user_id = user.id"
                    class="li-item-search">
                    <span v-if="user.position != '' && user.position != null">[{{ user.position }}]</span> {{
                      user.last_name }}
                  </li>
                </div>
              </div>
            </div>
            <!-- </div> -->
          </div>
        </div>
        <div ref="input_list_employee" class="form-div">
          <div class="title-create-subtask">
            <span>Nhân viên</span>
          </div>
          <div class="form-control-create-subtask content-detail-right display-flex">
            <div id="edit-show-detail-nv-3" class="content-cskh icon-content-cskh" style="width: 100%;">
              <div id="employee_user_id-3" class="form-control-cskh padd-4 set-height-input-auto" @click.stop="toggleNV2()">
                <div class="width-change-ocean">
                  <span v-for="emp in employee_user_id" class="show-chan-multi">[{{ emp.position }}] {{
                    emp.last_name }}
                    <span @click.stop="removeEmp(emp.id)">&#x2715</span>
                  </span>
                </div>
                <input id="input-value-nv-3" type="hidden">
                <img src="@/assets/images/book.svg" alt="">
              </div>
              <div id="myDropdown-nv-ocean-3" class="dropdown-content-ocean">
                <div class="position-relative div-search-ocean">
                  <input type="text" id="myInput-search-nv-3" class="input-search-ocean"
                    @keyup="filterFunction('#myInput-search-nv-3', '#myDropdown-nv-ocean-3 li')">
                </div>
                <div class="list-item-search-ocean">
                  <li v-for="user in allUser"
                    @click.stop="toggleNV2(), employee_user_id.push({ id: user.id, position: user.position, last_name: user.last_name })"
                    class="li-item-search">
                    <span v-if="user.position != '' && user.position != null">[{{ user.position }}]</span> {{
                      user.last_name }}
                  </li>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="button-create-div mar-t-15">
          <div type="button" @click.prevent="createSubTask()" class="btn-create">
            <span>Tạo mới</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import $ from 'jquery'
import Chart from "../assets/styles/js/Chart.js"
import { computed, inject, onBeforeUnmount, onMounted, ref, watch } from "vue"
import service from "../services/service"
import { useRoute, useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import { userStore } from "../store/modules/userStore"
import helper from '@/services/helper'

const props = defineProps(['allUser'])
const emit = defineEmits(['createSubTaskAds', 'getListSubTask', 'getTaskInfo'])

const UserStore = userStore()
const route = useRoute()
const router = useRouter()
const Constant = inject("$constant")
const isLoading = inject('isLoading')

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
const input_leader = ref(null)
const input_list_employee = ref(null)
const handleClickOutside = (event) => {
  if (input_leader.value && !input_leader.value.contains(event.target)) {
    $("#myDropdown-tp-ocean-3").hide();
  }
  if (input_list_employee.value && !input_list_employee.value.contains(event.target)) {
    $("#myDropdown-nv-ocean-3").hide();
  }
}

const check_show_short_create = ref(false)

const task_id = route.params.task_id
const sub_task_name = ref("")
const leader_user_id = ref("")
const employee_user_id = ref([])
const createSubTask = async () => {
  $('.error').remove();
  $('.input-change-border-error').removeClass("input-change-border-error border-top border-2 border-danger");
  let url = process.env.VUE_APP_BASE_URL_API + '/' + Constant.pathCreateSubTask
  let headers = {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token')).token}`
  }
  let params = {
    task_id,
    sub_task_name: sub_task_name.value,
    leader_user_id: leader_user_id.value,
    employee_user_id: employee_user_id.value,
  }
  isLoading.value = true
  const response = await service.post(url, params, headers)
  isLoading.value = false
  if (response.status == 200) {
    if (response.data.returnCode == 200) {
      sub_task_name.value = ""
      leader_user_id.value = ""
      $('#span-leader-id-3').remove()
      employee_user_id.value = []
      Swal.fire('Thành Công', 'Tạo công việc thành công!', 'success')
      emit('getListSubTask', task_id)
      emit('getTaskInfo', task_id)
    } else {
      Swal.fire('Thất bại', 'Tạo công việc thất bại!', 'error');
    }
  } else if (response.status == 422) {
    $.each(response.data.data, function (key, value) {
      $('#' + key + '-3').parent().append('<p class="error padd-t-2" style="color: red; text-align: left; font-size: 12px;">' + value + '</p>');
      $('#' + key + '-3').addClass("input-change-border-error border-top border-2 border-danger");
    });
  }
}

const addText = (p_id, p_input_value, p_toggle, p_value) => {
  // Gan HTML add value
  const valueAdd = '<span id="span-leader-id-3">' + p_value + '</span>';
  // Xoa value trong div
  $(p_id).contents().remove();
  // Add moi value div
  $(valueAdd).appendTo(p_id);
  // Add value input
  $(p_input_value).val(p_value);
  $(p_toggle).toggle();
}
const toggleTP = () => {
  $("#myDropdown-tp-ocean-3").toggle();
  $("#myDropdown-nv-ocean-3").hide();
}
const toggleNV2 = () => {
  $("#myDropdown-nv-ocean-3").toggle();
  $("#myDropdown-tp-ocean-3").hide();
}
const removeEmp = (id) => {
  let indexToDelete = employee_user_id.value.findIndex(item => item.id == id)
  if (indexToDelete !== -1) {
    employee_user_id.value.splice(indexToDelete, 1)
  }
}
const filterFunction = (p_value_input, p_id_all) => {
  var txtValue, filter, ul, li, a, i, div;
  filter = $(p_value_input).val().toUpperCase();
  filter = removeAccents(filter);
  a = $(p_id_all);
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    txtValue = removeAccents(txtValue);
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}
const removeAccents = (str) => {
  var AccentsMap = [
    "aàảãáạăằẳẵắặâầẩẫấậ",
    "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
    "dđ", "DĐ",
    "eèẻẽéẹêềểễếệ",
    "EÈẺẼÉẸÊỀỂỄẾỆ",
    "iìỉĩíị",
    "IÌỈĨÍỊ",
    "oòỏõóọôồổỗốộơờởỡớợ",
    "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
    "uùủũúụưừửữứự",
    "UÙỦŨÚỤƯỪỬỮỨỰ",
    "yỳỷỹýỵ",
    "YỲỶỸÝỴ"
  ];
  for (var i = 0; i < AccentsMap.length; i++) {
    var re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g');
    var char = AccentsMap[i][0];
    str = str.replace(re, char);
  }
  return str;
}
</script>

<style scoped>
.button-create-div {
  display: flex;
  justify-content: center;
}

.btn-chay-ads {
  background: #00A5DC;
  color: #fff;
  border-radius: 6px;
  width: 40%;
  font-size: 14px;
  padding: 5px 0 7px 0;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  text-align: center;
}

.btn-create {
  background: #00A5DC;
  color: #fff;
  border-radius: 6px;
  width: 35%;
  font-size: 14px;
  padding: 5px 0 7px 0;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  text-align: center;
  margin-bottom: 10px;
}

.form-div {
  margin-top: 15px;
}

.form-control-create-subtask {
  width: 90%;
}

.title-create-subtask {
  color: #484848;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  padding: 0px 5px 5px 0;
}
</style>