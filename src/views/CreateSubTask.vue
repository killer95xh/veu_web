<template>
  <div class="header-table-detail display-flex">
    <h3 class="title-detail-h">Chi tiết công việc</h3>
    <div class="create-products">
      <span><a href="#" data-toggle="modal" data-target="#createSubTaskModal">+ Tạo công việc mới</a></span>
    </div>
  </div>

  <!-- Modal tao moi cong viec-->
  <div class="modal fade" id="createSubTaskModal" tabindex="-1" role="dialog" aria-labelledby="createSubTaskModalLabel-cv"
    aria-hidden="true">
    <div class="modal-dialog modal-xl modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="createSubTaskModalLabel-cv">Tạo công việc mới cho dự án {{ task.project_name }}
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body no-padding">
          <div class="content-create-du-an">
            <div class="create-detail-left border-right-modal padd-15">
              <div class="one-row-detail">
                <div class="title-detail no-padd-left">
                  <span>Tên công việc <span class="text-red">*</span></span>
                </div>
                <div class="content-detail">
                  <input v-model="sub_task_name" id="sub_task_name" type="text" placeholder="" class="form-control-cskh">
                </div>
              </div>

              <div class="one-row-detail">
                <div class="title-detail no-padd-left">
                  <span>Chi tiết công việc</span>
                </div>
                <div class="content-detail">
                  <textarea v-model="description" class="form-control-cskh" cols="30" rows="10"
                    style="height: 250px;"></textarea>
                </div>
              </div>

              <div class="one-row-detail row-add-file position-relative">
                <div class="custom-file">
                  <input type="file" class="custom-file-input" id="file-create-sub-task" accept="image/*" multiple
                    @change="uploadFileCreateSubTask($event)">
                  <img src="@/assets/images/addfile.svg" alt="" class="custom-file-label" for="file">
                </div>
                <div class="show-text-add-file position-relative">
                  <div style="position: absolute;right: -100px;top: -40px;">
                    <span style="position:absolute;right: 24px;top: 15px;font-size: 14px;">Tệp Đính Kèm</span>
                    <img src="@/assets/images/Union.svg" alt="">
                  </div>
                </div>
                <ul id="fileList" class="file-list">
                  <li v-for="(file, key) in list_file_create_sub_task" class="position-relative">
                    <img style="width:95px;height:95px;border-radius:20px" :src="file.src" :title="file.file_name" />
                    <div class='remove-list' @click="list_file_create_sub_task.splice(key, 1)"><span
                        class='close-remove'>x</span></div>
                  </li>
                </ul>
              </div>

            </div>

            <div class="create-detail-right padd-15 project-detail-create">

              <div class="one-row-cskh row-datepicker mar-t-10">
                <div class="title-detail">
                  <span>Deadline</span>
                </div>
                <div class="content-detail-right content-date-detail">
                  <div>
                    <!-- <input v-model="deadline_start_date" type="datetime-local" class="form-control-cskh date-one" placeholder="Lựa chọn">
                     -->
                    <input type="text" name="deadline_end_date" class="form-control-cskh date-one" id="datetimepicker" readonly="readonly">
                  </div>
                </div>
              </div>

              <div class="one-row-cskh row-datepicker mar-t-10">
                <div class="title-detail">
                  <span>Trạng thái</span>
                </div>
                <div class="content-detail-right display-flex">
                  <select v-model="status" class="form-control-cskh">
                    <option value="1">Chưa triển khai</option>
                    <option value="2">Làm lại</option>
                    <option value="3">Đang thực hiện</option>
                    <option value="4">Chờ xét duyệt</option>
                    <option value="5">Đã xét duyệt</option>
                    <option value="6">Đã bàn giao</option>
                  </select>
                </div>
              </div>

              <div class="one-row-cskh row-datepicker mar-t-10">
                <div class="title-detail">
                  <span>Khối lượng CV</span>
                </div>
                <div class="content-detail-right display-flex content-date-detail">
                  <input v-model="progress_target" type="text" class="form-control-cskh" placeholder="Khối lượng CV">
                  <span class="span-td"></span>
                  <input v-model="progress_type" type="text" class="form-control-cskh" placeholder="Tên CV">
                </div>
              </div>

              <div class="one-row-cskh row-datepicker mar-t-10">
                <div class="title-detail">
                  <span>Ưu tiên</span>
                </div>
                <div class="content-detail-right display-flex">
                  <select v-model="priority_level" class="form-control-cskh">
                    <option value="">Chọn ưu tiên</option>
                    <option value="1">Thấp</option>
                    <option value="2">Bình thường</option>
                    <option class="text-red" value="3">Cao</option>
                    <option class="text-red" value="4">Rất Cao</option>
                  </select>
                </div>
              </div>

              <div class="one-row-cskh mar-t-10">
                <div class="title-detail">
                  <span>Trưởng phòng <span class="text-red">*</span></span>
                </div>
                <div class="content-detail-right display-flex">
                  <!-- <div class="detail-nv position-relative"> -->
                  <div class="content-cskh icon-content-cskh" style="width: 100%;">
                    <div id="leader_user_id" type="text" class="form-control-cskh padd-4" @click="toggleTP()">
                      <input id="input-value-tp" type="hidden">
                      <img src="@/assets/images/book.svg" alt="">
                    </div>
                    <div id="myDropdown-tp-ocean" class="dropdown-content-ocean">
                      <div class="position-relative div-search-ocean">
                        <input type="text" id="myInput-search-tp" class="input-search-ocean"
                          @keyup="filterFunction('#myInput-search-tp', '#myDropdown-tp-ocean li')">
                      </div>
                      <div class="list-item-search-ocean">
                        <li v-for="user in allUser"
                          @click="addText('#leader_user_id', '#input-value-tp', '#myDropdown-tp-ocean', `[${user.position}] ${user.last_name}`), leader_user_id = user.id"
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

              <div class="one-row-cskh mar-t-10">
                <div class="title-detail">
                  <span>Người thực hiện</span>
                </div>
                <div class="content-detail-right display-flex">
                  <div id="edit-show-detail-nv-2" class="content-cskh icon-content-cskh" style="width: 100%;">
                    <div id="employee_user_id" class="form-control-cskh padd-4 set-height-input-auto"
                      @click="toggleNV2()">
                      <div class="width-change-ocean">
                        <span v-for="emp in employee_user_id" class="show-chan-multi">[{{ emp.position }}] {{
                          emp.last_name }}
                          <span @click.stop="removeEmp(emp.id)">&#x2715</span>
                        </span>
                      </div>
                      <input id="input-value-nv-2" type="hidden">
                      <img src="@/assets/images/book.svg" alt="">
                    </div>
                    <div id="myDropdown-nv-ocean-2" class="dropdown-content-ocean">
                      <div class="position-relative div-search-ocean">
                        <input type="text" id="myInput-search-nv" class="input-search-ocean"
                          @keyup="filterFunction('#myInput-search-nv', '#myDropdown-nv-ocean-2 li')">
                      </div>
                      <div class="list-item-search-ocean">
                        <li v-for="user in allUser"
                          @click="toggleNV2(), employee_user_id.push({ id: user.id, position: user.position, last_name: user.last_name })"
                          class="li-item-search">
                          <span v-if="user.position != '' && user.position != null">[{{ user.position }}]</span> {{
                            user.last_name }}
                        </li>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-popup btn-popup-set-cancel close-modal" data-dismiss="modal">Hủy
            bỏ</button>
          <button @click.prevent="createSubTask()" type="button" class="btn btn-popup btn-popup-set-success">Tạo
            Mới</button>
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
import { differenceInDays, parse } from 'date-fns'
import { userStore } from "../store/modules/userStore"
import helper from '@/services/helper'

const props = defineProps(['task', 'allUser'])
const emit = defineEmits(['getListSubTask', 'getTaskInfo'])

const UserStore = userStore()
const route = useRoute()
const router = useRouter()
const Constant = inject("$constant")
const isLoading = inject('isLoading')

onMounted(() => {
  $('#datetimepicker').datetimepicker({
    // format:'H:00 d-m-Y',
    minDate: new Date()
  });
})

const task_id = route.params.task_id
//params create
const sub_task_name = ref("")
const description = ref("")
const deadline_start_date = ref("")
const deadline_end_date = ref("")
const status = ref("1")
const progress_target = ref("")
const progress_type = ref("")
const priority_level = ref("")
const leader_user_id = ref("")

const employee_user_id = ref([])
const list_file_create_sub_task = ref([])
const uploadFileCreateSubTask = (event) => {
  if (window.File && window.FileList && window.FileReader) {
    let files = event.target.files; //FileList object
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      //Only picsselectedImage
      if (!file.type.match('image'))
        continue;
      let picReader = new FileReader();
      picReader.addEventListener("load", function(event) {
        let src = event.target.result;
        let file_name = event.target.name;
        list_file_create_sub_task.value.push({file, src, file_name})
      });
      //Read the image
      picReader.readAsDataURL(file);
    }
    $("#file-create-sub-task").val(null)
  } else {
    console.log("Your browser does not support File API");
  }
}
const createSubTask = async () => {
  $('.error').remove();
  $('.input-change-border-error').removeClass("input-change-border-error border-top border-2 border-danger");
  let url = process.env.VUE_APP_BASE_URL_API + '/' + Constant.pathCreateSubTask
  let headers = {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token')).token}`,
    'content-type': 'multipart/form-data',
  }
  let params = {
    file_attachments: list_file_create_sub_task.value,
    task_id,
    sub_task_name: sub_task_name.value,
    description: description.value,
    deadline_start_date: deadline_start_date.value,
    deadline_end_date: $('input[name="deadline_end_date"]').val(),
    status: status.value,
    progress_target: progress_target.value,
    progress_type: progress_type.value,
    priority_level: priority_level.value,
    leader_user_id: leader_user_id.value,

    employee_user_id: employee_user_id.value,
  }
  isLoading.value = true
  const response = await service.post(url, params, headers)
  isLoading.value = false
  if (response.status == 200) {
    if (response.data.returnCode == 200) {
      sub_task_name.value = ""
      description.value = ""
      deadline_start_date.value = ""
      deadline_end_date.value = ""
      status.value = "1"
      progress_target.value = ""
      progress_type.value = ""
      priority_level.value = ""
      leader_user_id.value = ""
      $('#span-leader-id').remove()
      employee_user_id.value = []
      list_file_create_sub_task.value = []
      Swal.fire('Thành Công', 'Tạo công việc thành công!', 'success')
      $('#createSubTaskModal .close').click()
      emit('getListSubTask', task_id)
      emit('getTaskInfo', task_id)
    } else {
      Swal.fire('Thất bại', 'Tạo công việc thất bại!', 'error');
    }
  } else if (response.status == 422) {
    $.each(response.data.data, function (key, value) {
      $('#' + key).parent().append('<p class="error padd-t-2" style="color: red; text-align: left; font-size: 12px;">' + value + '</p>');
      $('#' + key).addClass("input-change-border-error border-top border-2 border-danger");
    });
  }
}

const addText = (p_id, p_input_value, p_toggle, p_value) => {
  // Gan HTML add value
  const valueAdd = '<span id="span-leader-id">' + p_value + '</span>';
  // Xoa value trong div
  $(p_id).contents().remove();
  // Add moi value div
  $(valueAdd).appendTo(p_id);
  // Add value input
  $(p_input_value).val(p_value);
  $(p_toggle).toggle();
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

const toggleTP = () => {
  $("#myDropdown-tp-ocean").toggle();
  $("#myDropdown-nv-ocean-2").hide();
}

const toggleNV2 = () => {
  $("#myDropdown-nv-ocean-2").toggle();
  $("#myDropdown-tp-ocean").hide();
}

const removeEmp = (id) => {
  let indexToDelete = employee_user_id.value.findIndex(item => item.id == id)
  if (indexToDelete !== -1) {
    employee_user_id.value.splice(indexToDelete, 1)
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

<style scoped></style>