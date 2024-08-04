<template>
  <!-- Brgin Content -->
  <div class="content-ocean content-fix">
    <div class="upper-half">
      <!-- Begin Search -->
      <div id="Search">
        <div class="item-search">
          <p>Dự án</p>
          <input @keydown="loadingSearch()" v-model="keywordProjectName" type="text" class="input-search" placeholder="nhập tháng" />
        </div>
        <div class="item-search">
          <p>Tên khách hàng</p>
          <input @keydown="loadingSearch()" v-model="keywordCustomerName" type="text" class="input-search" placeholder="nhập tên khách hàng" />
        </div>
        <div class="item-search">
          <p>Tên nhân viên</p>
          <input @keydown="loadingSearch()" v-model="keywordTaskSupervisorName" type="text" class="input-search" placeholder="nhập tên nhân viên" />
        </div>
        <div class="item-search">
          <p>Trạng thái</p>
          <select v-model="keywordStatus" name="status" id="status" class="">
            <option value="0">Mặc định</option>
            <option value="">Tất cả</option>
            <option value="1">Đang chạy Ads</option>
            <option value="2">Đang thực hiện</option>
            <option value="3">Chưa triển khai</option>
            <option value="4">Đã tạm dừng </option>
          </select>
        </div>
        <div class="item-search">
          <p>Từ Ngày</p>
          <div id="date-picker-example" class="date-total" inline="true">
            <input v-model="keywordContractStartDate" placeholder="Select date" type="date" id="example"
              class="date-time padd-l-8">
          </div>
        </div>
        <div class="item-search">
          <p>Đến Ngày</p>
          <div id="date-picker-example" class="date-total" inline="true">
            <input v-model="keywordContractEndDate" placeholder="Select date" type="date" id="example" class="date-time padd-l-8">
          </div>
        </div>
        <div class="item-search">
          <button @click.prevent="resetFillter()" class="btn btn-info btn-custom">
            <div class="content-btn">
              <img src="@/assets/images/reset.svg" alt="">
              <span>reset</span>
            </div>
          </button>
        </div>
      </div>
      <!-- End Search -->

      <!-- Begin Show -->
      <div class="number_show_total">
        <div class="show-right pull-right">
          <div v-if="pageLink.length > 1" class="pagination">
            <a @click.prevent="changePage('prev')" href=""><img src="@/assets/images/pre.svg" alt=""></a>
            <a v-for="page in pageLink" :class="pageActive == page ? 'active' : ''" @click.prevent="changePage(page)"
              href="">{{ page }}</a>
            <a @click.prevent="changePage('next')" href="#"><img src="@/assets/images/next.svg" alt=""></a>
          </div>
        </div>
      </div>
      <!-- End Show -->
    </div>


    <div class="lower-half">
      <!-- Header Table -->
      <div class="create-products">
        <span><a href="#" data-toggle="modal" data-target="#exampleModal">+ Tạo dự án mới</a></span>
      </div>
      <div class="show-number-product">
        <span>Tổng dự án: <b>{{ taskFillter.length }}</b></span>
      </div>
      <!-- End header Table -->
    </div>

    <div class="table table-quan-ly table-task">
      <table>
        <thead>
          <tr>
            <th style="width: 25px"></th>
            <th style="text-align: left; width: 20%">Tên khách hàng <img @click="toggleSort(), sortBy = 'customer_name'" src="@/assets/images/sort-table.svg" alt=""></th>
            <th>Dự án <img @click="toggleSort(), sortBy = 'project_name'" src="@/assets/images/sort-table.svg" alt=""></th>
            <th>Trạng thái <img @click="toggleSort(), sortBy = 'status'" src="@/assets/images/sort-table.svg" alt=""></th>
            <th>Tiến độ <img @click="" src="@/assets/images/sort-table.svg" alt=""></th>
            <th>Hạn hợp đồng <img @click="toggleSort(), sortBy = 'contract_end_date'" src="@/assets/images/sort-table.svg" alt=""></th>
            <th>Tổng phụ trách <img @click="toggleSort(), sortBy = 'task_supervisor_last_name'" src="@/assets/images/sort-table.svg" alt=""></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in tasks">
            <td>
              <div v-if="warningDeadline(task) < 5 && ['2', '3'].includes(task.status)" class="canh-bao-detail">
                  <img src="@/assets/images/error.svg" alt="">
                  <div class="thong-bao-den-han-detail">
                      <div class="position-relative alert-hover">
                          <img src="@/assets/images/tooltip.svg" alt="">
                          <span class="text-thong-bao-detail position-absolute text-red">còn {{ warningDeadline(task) }} ngày nữa là đến deadline.</span>
                      </div>
                  </div>
              </div>
            </td>
            <td style="text-align: left" >
              <span @click="routerPush('TaskDetail', {task_id: task.id})" class="text-detail-task text-blue cursor-pointer">{{ task.customer_name }}</span>
            </td>
            <td>{{ task.project_name }}</td>
            <td v-if="task.status == '1'">Đang chạy Ads</td>
            <td v-else-if="task.status == '2'">Đang thực hiện</td>
            <td v-else-if="task.status == '3'">Chưa triển khai</td>
            <td v-else-if="task.status == '4'">Đã tạm dừng </td>
            <td v-else></td>
            <td>{{ task.progress }}%</td>
            <td :class="warningDeadline(task) < 5 && ['2', '3'].includes(task.status) ? 'text-red' : ''">{{ helper.formatDateTime(task.contract_end_date, 'dd-MM-yyyy') }}</td>
            <td> <span v-if="task.task_supervisor_position != null && task.task_supervisor_position != ''" >[{{ task.task_supervisor_position }}]</span>  {{ task.task_supervisor_last_name }}</td>
          </tr>
        </tbody>
      </table>
    </div>


  </div>
  <!-- End Content -->
  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-xl modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Tạo mới dự án</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body no-padding">
          <div class="content-create-du-an">
            <div class="create-du-an-left border-right-modal padd-30">
              <h4>Thông tin khách hàng</h4>
              <div class="one-row-cskh">
                <div class="title-cskh">
                  <span>Dự án <span class="text-red">*</span></span>
                </div>
                <div class="content-cskh">
                  <input v-model="project_name" id="project_name" type="text" placeholder="" class="form-control-cskh">
                </div>
              </div>

              <div class="one-row-cskh">
                <div class="title-cskh">
                  <span>Tên khách hàng <span class="text-red">*</span></span>
                </div>
                <div class="content-cskh icon-content-cskh">
                  <div id="customer_id" type="none" class="form-control-cskh padd-4" @click="toggleKH()">
                    <!-- Value send request -->
                    <input id="input-value-kh" type="hidden">
                    <img src="@/assets/images/book.svg" alt="">
                  </div>
                  <div id="myDropdown-kh-ocean" class="dropdown-content-ocean">
                    <div class="position-relative div-search-ocean">
                      <input type="text" id="myInput-search-kh" class="input-search-ocean"
                        @keyup="filterFunction('#myInput-search-kh', '#myDropdown-kh-ocean li')">
                    </div>
                    <div class="list-item-search-ocean">
                      <li v-for="customer in allCustomer"
                        @click="addText('#customer_id', '#input-value-kh', '#myDropdown-kh-ocean', customer.customer_name), setInfoCustomer(customer), customer_id = customer.id"
                        class="li-item-search">
                        {{ customer.customer_name }}
                      </li>
                    </div>

                  </div>
                </div>
              </div>
              <div class="one-row-cskh">
                <div class="title-cskh">
                  <span class="text-gray">Tên công ty</span>
                </div>
                <div class="content-cskh">
                  <input type="text" class="form-control-cskh" placeholder="Tên công ty" v-model="customer_company_name"
                    readonly>
                </div>
              </div>

              <div class="one-row-cskh">
                <div class="title-cskh">
                  <span class="text-gray">Số điện thoại</span>
                </div>
                <div class="content-cskh">
                  <input type="text" class="form-control-cskh" placeholder="Số điện thoại" v-model="customer_phone_number"
                    readonly>
                </div>
              </div>

              <div class="one-row-cskh">
                <div class="title-cskh">
                  <span class="text-gray">Email</span>
                </div>
                <div class="content-cskh">
                  <input type="text" class="form-control-cskh" placeholder="Email" v-model="customer_email" readonly>
                </div>
              </div>
              <div class="one-row-cskh">
                <div class="title-cskh">
                  <span class="text-gray">Địa chỉ</span>
                </div>
                <div class="content-cskh">
                  <input type="text" class="form-control-cskh" placeholder="Địa chỉ" v-model="customer_address" readonly>
                </div>
              </div>
              <div class="one-row-cskh">
                <div class="title-cskh">
                  <span>Ghi chú</span>
                </div>
                <div class="content-cskh">
                  <textarea v-model="note" id="note" class="form-control-cskh" cols="30" rows="10"
                    style="height: 80px;"></textarea>
                </div>
              </div>

            </div>

            <div class="create-du-an-right padd-30 position-relative">
              <h4>Thông tin quản lý</h4>
              <div class="one-row-cskh">
                <div class="title-cskh">
                  <span>Tổng phụ trách </span><span class="text-red">*</span>
                </div>
                <div class="content-cskh icon-content-cskh">
                  <div id="task_supervisor_user_id" class="form-control-cskh padd-4" @click="toggleTPT()">
                    Chọn tổng phụ trách
                    <input id="input-value-tpt" type="hidden">
                    <img src="@/assets/images/book.svg" alt="">
                  </div>
                  <div id="myDropdown-tpt-ocean" class="dropdown-content-ocean">
                    <div class="position-relative div-search-ocean">
                      <input type="text" id="myInput-search-tpt" class="input-search-ocean"
                        @keyup="filterFunction('#myInput-search-tpt', '#myDropdown-tpt-ocean li')">
                    </div>
                    <div class="list-item-search-ocean">
                      <li v-for="user in allUser"
                        @click="addText('#task_supervisor_user_id', '#input-value-tpt', '#myDropdown-tpt-ocean', `[${user.position}] ${user.last_name}`), task_supervisor_user_id = user.id"
                        class="li-item-search">
                        [{{ user.position }}] {{ user.last_name }}
                      </li>
                    </div>
                  </div>
                </div>
              </div>

              <div class="one-row-cskh">
                <div class="title-cskh">
                  <span>Độ ưu tiên <span class="text-red">*</span></span>
                </div>
                <div class="content-cskh icon-content-cskh">
                  <select v-model="priority_level" id="priority_level"
                    class="form-control-cskh selectpicker" data-live-search="true">
                    <option value="">Chọn độ ưu tiên</option>
                    <option value="1">Thấp</option>
                    <option value="2">Bình thường</option>
                    <option value="3">Cao</option>
                    <option value="4">Rất cao</option>
                  </select>
                </div>
              </div>
              <div class="one-row-cskh row-datepicker">
                <div class="title-cskh">
                  <span>Thời gian hợp đồng </span><span class="text-red">*</span>
                </div>
                <div class="content-cskh">
                  <div class="date-one width-100">
                    <input v-model="contract_start_date" id="contract_start_date" type="date"
                      class="form-control-cskh" placeholder="Lựa chọn">
                  </div>
                  <div class="width-100">
                    <input v-model="contract_end_date" id="contract_end_date" type="date" class="form-control-cskh"
                      placeholder="Lựa chọn">
                  </div>
                </div>
              </div>
              <h4 class="title-create-cv position-relative" @click="toggleCV(), check_create_sub_task = !check_create_sub_task">
                Tạo công việc đầu tiên
                <span class="click-show-create-cv pull-right">
                  <svg  class="drop-set drop-up" xmlns="http://www.w3.org/2000/svg" width="13" height="7" viewBox="0 0 13 7" fill="none">
                    <path d="M6.05348 6.61773L0.160625 1.22521C-0.053661 1.02914 -0.0536761 0.343519 0.16061 0.147452C0.374895 -0.0486159 1.39277 -0.0491836 1.60705 0.146884L6.42848 4.55895L11.2499 0.146884C11.4642 -0.0491836 12.2682 -0.04885 12.4825 0.147218C12.6968 0.343285 12.9106 1.02914 12.6963 1.22521L6.80348 6.61773C6.69634 6.71577 6.5892 6.7648 6.42848 6.7648C6.26777 6.7648 6.16062 6.71577 6.05348 6.61773Z" fill="#656569"/>
                  </svg>
                  <svg class="drop-set drop-dow display-none" xmlns="http://www.w3.org/2000/svg" width="13" height="7" viewBox="0 0 13 7" fill="none">
                    <path d="M6.05348 0.146729L0.160625 5.53542C-0.053661 5.73135 -0.0536761 6.41649 0.16061 6.61242C0.374895 6.80835 1.39277 6.80891 1.60705 6.61299L6.42848 2.20406L11.2499 6.61299C11.4642 6.80891 12.2682 6.80858 12.4825 6.61265C12.6968 6.41672 12.9106 5.73135 12.6963 5.53542L6.80348 0.146729C6.69634 0.0487652 6.5892 -0.000234604 6.42848 -0.000234604C6.26777 -0.000234604 6.16062 0.0487652 6.05348 0.146729Z" fill="#656569"/>
                  </svg>
                </span>
              </h4>
              <hr class="hr-my-set">

              <!-- begin div tao cong viec -->
              <div id="create-cv-task" class="display-none">
                <div class="one-row-cskh padd-t-15">
                  <div class="title-cskh">
                    <span>Tên công việc </span><span class="text-red">*</span>
                  </div>
                  <div class="content-cskh icon-content-cskh">
                    <input v-model="sub_task_name" id="sub_task_name" type="text" class="form-control-cskh" placeholder="Tên công việc">
                  </div>
                </div>

                <div class="one-row-cskh">
                  <div class="title-cskh">
                    <span>Trưởng phòng </span><span class="text-red">*</span>
                  </div>
                  <div class="content-cskh icon-content-cskh">
                    <div id="leader_user_id" type="text" class="form-control-cskh padd-4" @click="toggleTP()"></div>
                    <input id="input-value-tp" type="hidden">
                    <img src="@/assets/images/book.svg" alt="">
                    <div id="myDropdown-tp-ocean" class="dropdown-content-ocean">
                      <div class="position-relative div-search-ocean">
                        <input type="text" id="myInput-search-tp" class="input-search-ocean"
                          @keyup="filterFunction('#myInput-search-tp', '#myDropdown-tp-ocean li')">
                      </div>
                      <div class="list-item-search-ocean">
                        <li v-for="user in allUser"
                          @click="addText('#leader_user_id', '#input-value-tp', '#myDropdown-tp-ocean', `[${user.position}] ${user.last_name}`), leader_user_id = user.id"
                          class="li-item-search">
                          [{{ user.position }}] {{ user.last_name }}
                        </li>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="one-row-cskh">
                  <div class="title-cskh">
                    <span>Nhân viên</span>
                  </div>
                  <div class="content-cskh icon-content-cskh">
                    <div id="employee_user_id" class="form-control-cskh padd-4 set-height-input-auto" @click="toggleNV()">
                      <span v-for="emp in employee_user_id" class="show-chan-multi">[{{ emp.position }}] {{ emp.last_name }}<span @click.stop="removeEmp(emp.id)">&#x2715</span></span>
                    </div>
                    <input id="input-value-nv" type="hidden">
                    <img src="@/assets/images/book.svg" alt="">
                    <div id="myDropdown-nv-ocean" class="dropdown-content-ocean">
                      <div class="position-relative div-search-ocean">
                        <input type="text" id="myInput-search-nv" class="input-search-ocean"
                          @keyup="filterFunction('#myInput-search-nv', '#myDropdown-nv-ocean li')">
                      </div>
                      <div class="list-item-search-ocean">
                        <li v-for="user in allUser"
                          @click="chanMulti('#employee_user_id', '#input-value-nv', '#myDropdown-nv-ocean', `[${user.position}] ${user.last_name}`), employee_user_id.push({id: user.id, last_name: user.last_name, position: user.position})"
                          class="li-item-search">
                          [{{ user.position }}] {{ user.last_name }}
                        </li>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- end div tao cong viec -->

            </div>
          </div>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-popup btn-popup-set-cancel" data-dismiss="modal">Hủy bỏ</button>
          <button @click.prevent="createTask()" type="button" class="btn btn-popup btn-popup-set-success">Tạo
            Mới</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import $ from 'jquery'
import { computed, inject, onMounted, ref, watch } from "vue"
import service from "../services/service"
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import { differenceInDays, parse, format, startOfToday, addMonths, subDays} from 'date-fns'
import helper from '@/services/helper'

const router = useRouter()
const Constant = inject("$constant")
const isLoading = inject('isLoading')

//setting page
const pageActive = ref(1)
const countRow = ref(10)
const changePage = async (page) => {
  if (page == "prev") {
    if (pageActive.value > 1) {
      pageActive.value--
    }
  } else if (page == "next") {
    if (pageActive.value < pageLink.value.length) {
      pageActive.value++
    }
  } else {
    pageActive.value = page
  }
}
var typingTimerOn
var typingTimerOff
const keywordProjectName = ref("")
const keywordCustomerName = ref("")
const keywordTaskSupervisorName = ref("")
const loadingSearch = () => {
  clearTimeout(typingTimerOn)
  clearTimeout(typingTimerOff)
  typingTimerOn = setTimeout(() => {
    isLoading.value = true
  }, 1000)

  typingTimerOff = setTimeout(() => {
    isLoading.value = false
    searchByProjectName.value = keywordProjectName.value
    searchByCustomerName.value = keywordCustomerName.value
    searchByTaskSupervisorName.value = keywordTaskSupervisorName.value
  }, 1500)
}
const keywordStatus = ref("0")
const keywordContractStartDate = ref(format(subDays(startOfToday(), 14), 'yyyy-MM-dd'))
const keywordContractEndDate = ref(format(addMonths(new Date(), 1), 'yyyy-MM-dd'))
watch([keywordStatus, keywordContractStartDate, keywordContractEndDate, ], () => {
  isLoading.value = true
  setTimeout(() => {
    searchByStatus.value = keywordStatus.value
    searchByContractStartDate.value = keywordContractStartDate.value
    searchByContractEndDate.value = keywordContractEndDate.value
    isLoading.value = false
  }, 500)
})
//fillter data
const searchByProjectName = ref("")
const searchByCustomerName = ref("")
const searchByTaskSupervisorName = ref("")
const searchByStatus = ref("0")
const searchByContractStartDate = ref(format(subDays(startOfToday(), 14), 'yyyy-MM-dd'))
const searchByContractEndDate = ref(format(addMonths(new Date(), 1), 'yyyy-MM-dd'))
const resetFillter = () => {
  isLoading.value = true
  setTimeout(() => {
    keywordProjectName.value = ""
    keywordCustomerName.value = ""
    keywordTaskSupervisorName.value = ""
    keywordStatus.value = "0"
    keywordContractStartDate.value = ""
    keywordContractEndDate.value = ""
    searchByProjectName.value = ""
    searchByCustomerName.value = ""
    searchByTaskSupervisorName.value = ""
    searchByStatus.value = "0"
    searchByContractStartDate.value = ""
    searchByContractEndDate.value = ""
    isLoading.value = false
  }, 500)
}
const taskFillter = computed(() => {
  let tasks = allTask.value
  tasks = tasks.filter(task =>
    task.project_name.toUpperCase().includes(searchByProjectName.value.toUpperCase())
    && task.customer_name.toUpperCase().includes(searchByCustomerName.value.toUpperCase())
    && (task.task_supervisor_first_name.toUpperCase() + " " + task.task_supervisor_last_name.toUpperCase()).includes(searchByTaskSupervisorName.value.toUpperCase())
  )
  if (searchByStatus.value != "") {
    if (searchByStatus.value == "0") {
      tasks = tasks.filter(task => ["1", "2", "3"].includes(task.status))
    } else {
      tasks = tasks.filter(task => task.status == searchByStatus.value)
    }
  }
  if (searchByContractStartDate.value !== "" && searchByContractEndDate.value !== "") {
    const startDate = new Date(searchByContractStartDate.value);
    const endDate = new Date(searchByContractEndDate.value);

    if (startDate <= endDate) {
      tasks = tasks.filter(task => {
        const taskStartDate = new Date(task.contract_start_date);
        const taskEndDate = new Date(task.contract_end_date);
  
        // Kiểm tra xem phạm vi thời gian của dự án có chồng lên với phạm vi tìm kiếm hay không
        return (
          (taskStartDate >= startDate && taskStartDate <= endDate) ||  // Bắt đầu trong khoảng tìm kiếm
          (taskEndDate >= startDate && taskEndDate <= endDate) ||      // Kết thúc trong khoảng tìm kiếm
          (taskStartDate <= startDate && taskEndDate >= endDate)        // Bắt đầu trước và kết thúc sau khoảng tìm kiếm
        );
      });
    }
  }

  return tasks;
})
const sortBy = ref("customer_name")
const sort = ref("ASC")
const tasks = computed(() => {
  let tasks = taskFillter.value
  tasks = tasks.sort((a, b) => {
    return sort.value == "ASC" ? a[sortBy.value].localeCompare(b[sortBy.value]) : b[sortBy.value].localeCompare(a[sortBy.value])
  })
  tasks = tasks.filter((task, idx) =>
    idx >= (pageActive.value - 1) * countRow.value
    && idx < pageActive.value * countRow.value
  )
  return tasks
})
const pageLink = computed(() => {
  let pageLink = []
  const countPage = Math.ceil(taskFillter.value.length / countRow.value)
  for (let i = 1; i <= countPage; i++) {
    pageLink.push(i)
  }
  return pageLink
})
const toggleSort = () => {
  sort.value = sort.value == "ASC" ? "DESC" : "ASC"
}

//get all data
const allTask = ref([])
const getAllTask = async (page) => {
  if (page == "prev") {
    if (pageActive.value > 1) {
      pageActive.value--
    }
  } else if (page == "next") {
    if (pageActive.value < pageLink.value.length - 2) {
      pageActive.value++
    }
  } else {
    pageActive.value = page
  }
  let url = process.env.VUE_APP_BASE_URL_API + '/' + Constant.pathGetAllTask
  let headers = {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token')).token}`,
  }
  isLoading.value = true
  const response = await service.get(url, {}, headers);
  isLoading.value = false
  if (response.data.returnCode == "200") {
    allTask.value = response.data.data
  }
}
onMounted(() => {
  getAllTask(pageActive.value);
});

//get list user
const allUser = ref([])
const getAllUser = async () => {
  let url = process.env.VUE_APP_BASE_URL_API + '/' + Constant.pathGetListSelectSale
  let params = {
    employment_state: "1"
  }
  let headers = {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token')).token}`,
  }
  const response = await service.get(url, params, headers);
  if (response.data.returnCode == "200") {
    allUser.value = response.data.data.listSelectSale
  }
}
getAllUser()

//get list customer
const allCustomer = ref([])
const getAllCustomer = async () => {
  let url = process.env.VUE_APP_BASE_URL_API + '/' + Constant.pathGetListCustomerBudgetActive
  let headers = {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token')).token}`,
  }
  isLoading.value = true
  const response = await service.get(url, {}, headers);
  isLoading.value = false
  if (response.data.returnCode == "200") {
    allCustomer.value = response.data.data.allCustomerBudget
  }
}
getAllCustomer()

//params create
const customer_id = ref("")
const project_name = ref("")
const note = ref("")
const task_supervisor_user_id = ref("")
const priority_level = ref("")
const contract_start_date = ref(new Date().toISOString().split('T')[0])
const contract_end_date = ref("")

const check_create_sub_task = ref(false)
watch(() => check_create_sub_task.value, (newValue, oldValue) => {
  console.log(newValue);
})
const sub_task_name = ref("")
const leader_user_id = ref("")
const employee_user_id = ref([])
const createTask = async () => {
  $('.error').remove();
  $('.input-change-border-error').removeClass("input-change-border-error border-top border-2 border-danger");
  let url = process.env.VUE_APP_BASE_URL_API + '/' + Constant.pathCreateTask
  let headers = {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token')).token}`,
  }
  let params = {
    customer_id: customer_id.value,
    project_name: project_name.value,
    note: note.value,
    task_supervisor_user_id: task_supervisor_user_id.value,
    priority_level: priority_level.value,
    contract_start_date: contract_start_date.value,
    contract_end_date: contract_end_date.value,


    check_create_sub_task: check_create_sub_task.value,
    sub_task_name: sub_task_name.value,
    leader_user_id: leader_user_id.value,
    employee_user_id: employee_user_id.value
  }
  isLoading.value = true
  const response = await service.post(url, params, headers)
  isLoading.value = false
  if (response.status == 200) {
    if (response.data.returnCode == 200) {
      Swal.fire('Thành Công', 'Tạo công việc thành công!', 'success').then((result) => {
        if (result.isConfirmed) {
          window.location.reload()
        }
      })
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

const customer_company_name = ref("")
const customer_phone_number = ref("")
const customer_email = ref("")
const customer_address = ref("")
const setInfoCustomer = (customer) => {
  customer_company_name.value = customer.company_name
  customer_phone_number.value = customer.phone_number
  customer_email.value = customer.email
  customer_address.value = customer.address
}

const warningDeadline = (task) => {
  if (task.status == "2" || task.status == "3") {
    const targetDateTime = parse(task.contract_end_date, 'yyyy-MM-dd', new Date());
    const hoursDifference = differenceInDays(targetDateTime, new Date())
    return hoursDifference
  }
  return 10
}

const toggleKH = () => {
  $("#myDropdown-kh-ocean").toggle();
  $("#myDropdown-tp-ocean").hide();
  $("#myDropdown-nv-ocean").hide();
  $("#myDropdown-tpt-ocean").hide();
}
const toggleTP = () => {
  $("#myDropdown-tp-ocean").toggle();
  $("#myDropdown-kh-ocean").hide();
  $("#myDropdown-nv-ocean").hide();
  $("#myDropdown-tpt-ocean").hide();
}
const toggleNV = () => {
  $("#myDropdown-nv-ocean").toggle();
  $("#myDropdown-tp-ocean").hide();
  $("#myDropdown-kh-ocean").hide();
  $("#myDropdown-tpt-ocean").hide();
}
const toggleTPT = () => {
  $("#myDropdown-tpt-ocean").toggle();
  $("#myDropdown-nv-ocean").hide();
  $("#myDropdown-tp-ocean").hide();
  $("#myDropdown-kh-ocean").hide();
}

$(document).click(function(event) {
  if (!$(event.target).closest('#customer_id').length) {
    if ($('#myDropdown-kh-ocean').is(':visible')) {
      if (!$(event.target).closest('.input-search-ocean').length) {
        $("#myDropdown-kh-ocean").toggle();
      }
    }
  }
  if (!$(event.target).closest('#employee_user_id').length) {
    if ($('#myDropdown-nv-ocean').is(':visible')) {
      if (!$(event.target).closest('.input-search-ocean').length) {
        $("#myDropdown-nv-ocean").toggle();
      }
    }
  }
  if (!$(event.target).closest('#leader_user_id').length) {
    if ($('#myDropdown-tp-ocean').is(':visible')) {
      if (!$(event.target).closest('.input-search-ocean').length) {
        $("#myDropdown-tp-ocean").toggle();
      }
    }
  }
  if (!$(event.target).closest('#task_supervisor_user_id').length) {
    if ($('#myDropdown-tpt-ocean').is(':visible')) {
      if (!$(event.target).closest('.input-search-ocean').length) {
        $("#myDropdown-tpt-ocean").toggle();
      }
    }
  }
});

const toggleCV = () => {
  $("#create-cv-task").slideToggle();
  $(".drop-up").slideToggle();
  $(".drop-dow").slideToggle();
}

const addText = (p_id, p_input_value, p_toggle, p_value) => {
  // Gan HTML add value
  const valueAdd = '<span>' + p_value + '</span>';
  // Xoa value trong div
  $(p_id).contents().remove();
  // Add moi value div
  $(valueAdd).appendTo(p_id);
  // Add value input
  $(p_input_value).val(p_value);
  $(p_toggle).toggle();
}

const chanMulti = (p_id, p_input_value, p_toggle, p_value) => {
  $(p_toggle).toggle();
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

function removeAccents(str) {
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
const routerPush = (name, params = {}) => {
  router.push({
    name,
    params
  })
}

</script>
<style scoped></style>