<template>
  <div class="title-quan-ly-nhan-vien d-flex">
    <div class="d-flex mb-3">
      <div style="padding-right: 85px" class="title-budget d-flex">
        <div style="padding-top: 5px" class="item-title-budget">
          {{ cycle_selected.cycle_name }}
          <img @click="editCycleBudget()" class="button-edit-title item-title-budget" src="@/assets/images/edit.svg" alt="">
        </div>
        <span v-if="cycle_selected.is_root == '1'" class="badge badge-sm bg-edit"> mặc định </span>
      </div>
      <div class="search-quan-ly-nhan-vien">
        <input @keydown="loadingSearch()" v-model="keywordSaleName" type="text" placeholder="nhập tên nhân viên Sale">
      </div>
      <div class="search-quan-ly-nhan-vien mar-l-15">
        <select v-model="keywordCycle" class="form-control-cskh height-33">
          <option v-for="cycle in allCycle" :value="cycle.id">{{ cycle.cycle_name }}</option>
        </select>
      </div>
      <div class="search-quan-ly-nhan-vien mar-l-15">
        <select v-model="keywordStatus" class="form-control-cskh height-33">
          <option value="1">Đang chạy</option>
          <option value="0">Đã tạm dừng</option>
        </select>
      </div>
    </div>
    <div>
    <div v-if="id_edit != ''" class="display-flex mar-l-15 mar-r-15 mb-3">
      <button class="btn btn-popup btn-popup-set-cancel" @click.prevent="cancelEditBudget()">Hủy bỏ</button>
      <button class="btn btn-popup btn-popup-set-success mar-l-15" @click.prevent="updateBudget()">Lưu</button>
    </div>
    <div v-else class="display-flex mar-l-15 mar-r-15 mb-3">
      <button class="btn btn-popup btn-popup-set-success" data-toggle="modal" data-target="#modalCreateBudget">Chốt sổ</button>
    </div>
    </div>
  </div>
  <!-- <div class="header-quan-ly-nhan-vien">
  </div> -->
  <div
    @scroll="hanldeScroll()"
    ref="div_table_budget"
    id="table-custom-db"
    class="table-custom-db"
    :class="{
      'fixed-header': active_fixed_header
    }">
    <table>
      <thead>
        <tr>
          <th class="text-midddle text-center min-width-120 text-black font-bold fixed-scroll-x" rowspan="4">Tên khách hàng</th>
          <th class="text-midddle text-center min-width-120 text-red font-bold" rowspan="4">Số tiền KH đã tạm ứng</th>
          <th class="text-midddle text-center min-width-120 text-black font-bold" colspan="2">Phí dịch vụ</th>
          <th class="text-midddle text-center min-width-120 text-black font-bold" colspan="2">Số lượng công việc</th>
          <th class="text-midddle text-center min-width-120 text-black font-bold" colspan="2">Dịch vụ khác</th>
          <th class="text-midddle text-center min-width-120 text-red font-bold" colspan="7">SỐ TIỀN QUẢNG CÁO CỦA KHÁCH HÀNG ĐÃ CHI TIÊU THỰC TẾ +
            THUẾ</th>

          <th class="text-midddle text-center min-width-120 text-black font-bold" rowspan="4">Tổng số tiền đã chi tiêu trước thuế</th>
          <th class="text-midddle text-center min-width-120 text-black font-bold" rowspan="4">Tổng số tiền đã chi tiêu sau thuế</th>
          <th class="text-midddle text-center min-width-120 text-sky-cskh font-bold" rowspan="4">UPDATE (tính đến hết ngày)</th>
          <th class="text-midddle text-center min-width-120 text-red font-bold" rowspan="4">Ngày dự kiến hết ngân sách</th>
          <th class="text-midddle text-center min-width-120 text-sky-cskh font-bold" rowspan="4">Ngân sách/ ngày (Trình QLQC)</th>
          <th class="text-midddle text-center min-width-120 text-black font-bold" rowspan="4">Số tiền còn lại trong TQLQC</th>
          <th class="text-midddle text-center min-width-120 text-red font-bold" rowspan="4">Số tiền của KH còn lại</th>
          <th class="text-midddle text-center min-width-120 text-black font-bold" rowspan="4">Trạng thái</th>
          <th class="text-midddle text-center min-width-120 text-black font-bold" rowspan="4">Nhân viên phụ trách</th>
          <th class="text-midddle text-center min-width-120 text-black font-bold" rowspan="4">Tổng phụ trách</th>
        </tr>

        <tr>
          <th class="text-midddle text-center min-width-120 text-black font-bold" rowspan="3">Phí</th>
          <th class="text-midddle text-center min-width-120 text-black font-bold" rowspan="3">Thời gian áp dụng phí</th>
          <th class="text-midddle text-center min-width-120 text-black font-bold" rowspan="3">Mặc định</th>
          <th class="text-midddle text-center min-width-120 text-black font-bold" rowspan="3">Thực tế</th>
          <th class="text-midddle text-center min-width-120 text-black font-bold" rowspan="3">Số tiền</th>
          <th class="text-midddle text-center min-width-120 text-black font-bold" rowspan="3">Ghi chú</th>

        </tr>
        <tr>
          <th class="text-midddle text-center text-sky-cskh font-bold" colspan="2">Facebook</th>
          <th class="text-midddle text-center text-sky-cskh font-bold" colspan="2">Tiktok</th>
          <th class="text-midddle text-center text-sky-cskh font-bold" colspan="2">Google</th>
          <th class="text-midddle text-center text-sky-cskh font-bold" rowspan="2">Zalo</th>
        </tr>

        <tr>
          <th class="text-midddle text-center min-width-120 text-sky-cskh font-bold">Số tiền đã chi tiêu (TQLQC)</th>
          <th class="text-midddle text-center min-width-120 text-black font-bold">Số tiền sau thuế (5%)</th>
          <th class="text-midddle text-center min-width-120 text-sky-cskh font-bold">Số tiền đã chi tiêu (TQLQC)</th>
          <th class="text-midddle text-center min-width-120 text-black font-bold">Số tiền sau thuế (10,8%)</th>
          <th class="text-midddle text-center min-width-120 text-sky-cskh font-bold">Số tiền đã chi tiêu (TQLQC)</th>
          <th class="text-midddle text-center min-width-120 text-black font-bold">Số tiền sau thuế (5%)</th>
        </tr>
      </thead>
      <tbody>
        <tr class="tr-budget" v-for="customer in listCustomerBudgetFillter" :style="id_edit == customer.id ? 'background-color: #DBF6FF': ''">
          <td class="text-midddle text-center fixed-scroll-x"
            :style="id_edit == customer.id ? 'background-color: #DBF6FF': ''">
            <div style="width: 100%" class="display-flex min-width-120">
              <a @click.prevent="editBudget(customer.id)" v-if="id_edit == ''" href="" style="padding-right: 15px;padding-top: 5px;">
                <img src="@/assets/images/edit.svg" alt="">
              </a>
              <span style="text-align: left">{{ customer.customer_name }}</span>
            </div>
          </td>
          <td v-if="id_edit == customer.id" class="text-midddle text-center"><input type="text"
              :id="customer.id + '_advance_amount'" @keyup="formatValue($event)"
              :value="helper.formatNumberToVND(customer.advance_amount)" class="edit-input-finan form-control-cskh"></td>
          <td v-else class="text-midddle text-center text-red">{{ helper.formatNumberToVND(customer.advance_amount) }}</td>

          <td v-if="id_edit == customer.id" class="text-midddle text-center"><input type="text" :id="customer.id + '_fee'"
              @keyup="formatValue($event)" :value="helper.formatNumberToVND(customer.fee)"
              class="edit-input-finan form-control-cskh"></td>
          <td v-else class="text-midddle text-center">{{ helper.formatNumberToVND(customer.fee) }}</td>

          <td v-if="id_edit == customer.id" class="text-midddle text-center"><input type="text"
              :id="customer.id + '_fee_date'" :value="customer.fee_date" class="edit-input-finan form-control-cskh"></td>
          <td v-else class="text-midddle text-center">{{ customer.fee_date }}</td>

          <td v-if="id_edit == customer.id" class="text-midddle text-center"><input type="text"
              :id="customer.id + '_default_video_quantity'" :value="customer.default_video_quantity"
              class="edit-input-finan form-control-cskh"></td>
          <td v-else class="text-midddle text-center">{{ customer.default_video_quantity }}</td>

          <td v-if="id_edit == customer.id" class="text-midddle text-center"><input type="text"
              :id="customer.id + '_additional_video_quantity'" :value="customer.additional_video_quantity"
              class="edit-input-finan form-control-cskh"></td>
          <td v-else class="text-midddle text-center">{{ customer.additional_video_quantity }}</td>

          <td v-if="id_edit == customer.id" class="text-midddle text-center"><input type="text"
              :id="customer.id + '_additional_service_cost'" @keyup="formatValue($event)"
              :value="helper.formatNumberToVND(customer.additional_service_cost)"
              class="edit-input-finan form-control-cskh"></td>
          <td v-else class="text-midddle text-center">{{ helper.formatNumberToVND(customer.additional_service_cost) }}
          </td>

          <td v-if="id_edit == customer.id" class="text-midddle text-center"><input type="text"
              :id="customer.id + '_additional_service_note'" :value="customer.additional_service_note"
              class="edit-input-finan form-control-cskh"></td>
          <td v-else class="text-midddle text-center">{{ customer.additional_service_note }}</td>

          <td v-if="id_edit == customer.id" class="text-midddle text-center"><input type="text"
              :id="customer.id + '_facebook_service_amount'" @keyup="formatValue($event)"
              :value="helper.formatNumberToVND(customer.facebook_service_amount)"
              class="edit-input-finan form-control-cskh"></td>
          <td v-else class="text-midddle text-center text-sky-cskh">{{ helper.formatNumberToVND(customer.facebook_service_amount) }}
          </td>
          <td class="text-midddle text-center">{{ helper.formatNumberToVND(customer.facebook_service_after_tax) }}</td>

          <td v-if="id_edit == customer.id" class="text-midddle text-center"><input type="text"
              :id="customer.id + '_tiktok_service_amount'" @keyup="formatValue($event)"
              :value="helper.formatNumberToVND(customer.tiktok_service_amount)"
              class="edit-input-finan form-control-cskh"></td>
          <td v-else class="text-midddle text-center text-sky-cskh">{{ helper.formatNumberToVND(customer.tiktok_service_amount) }}</td>
          <td class="text-midddle text-center">{{ helper.formatNumberToVND(customer.tiktok_service_after_tax) }}</td>

          <td v-if="id_edit == customer.id" class="text-midddle text-center"><input type="text"
              :id="customer.id + '_google_service_amount'" @keyup="formatValue($event)"
              :value="helper.formatNumberToVND(customer.google_service_amount)"
              class="edit-input-finan form-control-cskh"></td>
          <td v-else class="text-midddle text-center text-sky-cskh">{{ helper.formatNumberToVND(customer.google_service_amount) }}</td>
          <td class="text-midddle text-center">{{ helper.formatNumberToVND(customer.google_service_after_tax) }}</td>

          <td v-if="id_edit == customer.id" class="text-midddle text-center"><input type="text"
              :id="customer.id + '_zalo_service_amount'" @keyup="formatValue($event)"
              :value="helper.formatNumberToVND(customer.zalo_service_amount)" class="edit-input-finan form-control-cskh">
          </td>
          <td v-else class="text-midddle text-center text-sky-cskh">{{ helper.formatNumberToVND(customer.zalo_service_amount) }}</td>

          <td class="text-midddle text-center">{{ helper.formatNumberToVND(customer.total_amount_before_tax) }}</td>
          <td class="text-midddle text-center">{{ helper.formatNumberToVND(customer.total_amount_after_tax) }}</td>

          <td v-if="id_edit == customer.id" class="text-midddle text-center"><input type="date"
              :id="customer.id + '_last_update_date'" :value="customer.last_update_date"
              class="edit-input-finan form-control-cskh"></td>
          <td v-else class="text-midddle text-center text-sky-cskh">{{ helper.formatDateTime(customer.last_update_date, "dd-MM-yyyy") }}</td>

          <td class="text-midddle text-center text-red">{{ helper.formatDateTime(customer.projected_budget_end_date, "dd-MM-yyyy") }}</td>
          <td v-if="id_edit == customer.id" class="text-midddle text-center"><input type="text"
              :id="customer.id + '_budget_per_day'" @keyup="formatValue($event)"
              :value="helper.formatNumberToVND(customer.budget_per_day)" class="edit-input-finan form-control-cskh"></td>
          <td v-else class="text-midddle text-center text-sky-cskh">{{ helper.formatNumberToVND(customer.budget_per_day) }}</td>
          <td class="text-midddle text-center">{{ helper.formatNumberToVND(customer.remaining_amount) }}</td>
          <td class="text-midddle text-center text-red">{{ helper.formatNumberToVND(customer.customer_balance) }}</td>
          <td v-if="id_edit == customer.id" class="text-midddle text-center">
            <select :id="customer.id + '_status'" :value="customer.status" class="form-control-cskh edit-input-finan">
              <option value="1">Đang chạy</option>
              <option value="0">Đã tạm dừng</option>
            </select>
          </td>
          <td v-else class="text-midddle text-center">{{ customer.status == "1" ? "Đang chạy" : "Đã tạm dừng" }}</td>

          <td v-if="id_edit == customer.id" class="text-midddle text-center">
            <select :id="customer.id + '_ads_user_id'" :value="customer.ads_user_id" class="form-control-cskh edit-input-finan">
              <option value="">Lựa chọn</option>
              <option v-for="user in allUser" :value="user.id"><span v-if="user.position != '' && user.position != null">[{{ user.position }}]</span> {{
                user.last_name }}</option>
            </select>
          </td>
          <td v-else class="text-midddle text-center"><span v-if="customer.ads_position != '' && customer.ads_position != null">[{{ customer.ads_position }}]</span>  {{ customer.ads_last_name }}</td>

          <td v-if="id_edit == customer.id" class="text-midddle text-center">
            <select :id="customer.id + '_sale_user_id'" :value="customer.sale_user_id" class="form-control-cskh edit-input-finan">
              <option value="">Lựa chọn</option>
              <option v-for="user in allUser" :value="user.id"><span v-if="user.position != '' && user.position != null">[{{ user.position }}]</span> {{
                user.last_name }}</option>
            </select>
          </td>
          <td v-else class="text-midddle text-center"><span v-if="customer.sale_position != '' && customer.sale_position != null">[{{ customer.sale_position }}]</span> {{ customer.sale_last_name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
<!-- Modal -->
  <div class="modal fade" id="modalCreateBudget" tabindex="-1" role="dialog" aria-labelledby="modalCreateBudgetLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalCreateBudgetLabel">Tạo quản lý ngân sách tháng mới</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="one-row-cskh">
            <div class="title-cskh">
              <span>Giai đoạn</span>
            </div>
            <div class="content-cskh">
              <input v-model="create_cycle_name" type="text" id="create_cycle_name" class="form-control-cskh" placeholder="Giai đoạn">
            </div>
          </div>
          <div class="one-row-cskh">
            <div class="title-cskh">
              <span>Đặt làm mặc định</span>
            </div>
            <div class="content-cskh">
              <label class="container">Mặc định
                <input v-model="create_is_root" type="radio" value="1" name="radio-create-cycle-budget">
                <span class="checkmark"></span>
              </label>
              <label class="container">Không
                <input v-model="create_is_root" type="radio" value="0" name="radio-create-cycle-budget">
                <span class="checkmark"></span>
              </label>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-popup btn-popup-set-cancel" data-dismiss="modal">Hủy bỏ</button>
          <button type="button" class="btn btn-popup btn-popup-set-success" @click="createCycleBudget()">Lưu</button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="modalEditBudget" tabindex="-1" role="dialog" aria-labelledby="modalEditBudgetLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalEditBudgetLabel">Sửa thông tin ngân sách <span v-if="cycle_selected.is_root == '1'" style="margin-top: 5px; position: absolute" class="badge badge-sm bg-edit"> mặc định </span></h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="one-row-cskh">
            <div class="title-cskh">
              <span>Giai đoạn</span>
            </div>
            <div class="content-cskh">
              <input v-model="update_cycle_name" type="text" id="update_cycle_name" class="form-control-cskh" placeholder="Giai đoạn">
            </div>
          </div>
          <div v-if="cycle_selected.is_root != '1'" class="one-row-cskh">
            <div class="title-cskh">
              <span>Đặt làm mặc định</span>
            </div>
            <div class="content-cskh">
              <label class="container">Mặc định
                <input v-model="update_is_root" type="radio" value="1" name="radio-update-cycle-budget">
                <span class="checkmark"></span>
              </label>
              <label class="container">Không
                <input v-model="update_is_root" type="radio" value="0" name="radio-update-cycle-budget">
                <span class="checkmark"></span>
              </label>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-popup btn-popup-set-cancel" data-dismiss="modal">Hủy bỏ</button>
          <button type="button" class="btn btn-popup btn-popup-set-success" @click="updateCycleBudget()">Lưu</button>
        </div>
      </div>
    </div>
  </div>
<!-- End Modal -->
</template>

<script setup>
import $ from 'jquery'
import Swal from 'sweetalert2'
import { computed, inject, ref, watch } from "vue"
import service from "../services/service"
import helper from "../services/helper"

const Constant = inject("$constant")
const isLoading = inject('isLoading')

//get list budget
const allCustomerBudget = ref([])
const getAllCustomerBudget = async () => {
  let url = process.env.VUE_APP_BASE_URL_API + '/' + Constant.pathGetAllCustomerBudget
  let headers = {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token')).token}`,
  }
  isLoading.value = true
  const response = await service.get(url, {}, headers);
  isLoading.value = false
  if (response.data.returnCode == "200") {
    allCustomerBudget.value = response.data.data.allCustomerBudget
  }
}
getAllCustomerBudget()

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

var typingTimerOn
var typingTimerOff
const keywordSaleName = ref("")
const loadingSearch = () => {
  clearTimeout(typingTimerOn)
  clearTimeout(typingTimerOff)
  typingTimerOn = setTimeout(() => {
    isLoading.value = true
  }, 1000)

  typingTimerOff = setTimeout(() => {
    isLoading.value = false
    valueSeachSaleName.value = keywordSaleName.value
  }, 1500)
}
const keywordStatus = ref("1")
watch([keywordStatus], () => {
  isLoading.value = true
  setTimeout(() => {
    valueSeachStatus.value = keywordStatus.value
    isLoading.value = false
  }, 500)
})
const keywordCycle = ref("")
watch([keywordCycle], () => {
  isLoading.value = true
  setTimeout(() => {
    valueSeachCycle.value = keywordCycle.value
    cycle_selected.value = allCycle.value.find(cycle => cycle.id  == valueSeachCycle.value)
    update_cycle_name.value = cycle_selected.value.cycle_name
    update_is_root.value = cycle_selected.value.is_root
    isLoading.value = false
  }, 500)
})
//filter
const valueSeachSaleName = ref("")
const valueSeachStatus = ref("1")
const valueSeachCycle = ref("")
const listCustomerBudgetFillter = computed(() => {
  let listCustomerBudget = allCustomerBudget.value
  listCustomerBudget = listCustomerBudget.filter(budget => budget.status == valueSeachStatus.value)
  listCustomerBudget = listCustomerBudget.filter(budget => budget.cycle_id == valueSeachCycle.value)
  if (valueSeachSaleName.value != "") {
    listCustomerBudget = listCustomerBudget.filter(budget =>
      budget.sale_last_name != null
      && (budget.sale_first_name.toUpperCase() + " " + budget.sale_last_name.toUpperCase()).includes(valueSeachSaleName.value.toUpperCase())
    )
  }
  return listCustomerBudget
})

//edit
const id_edit = ref("")
const editBudget = (id) => {
  id_edit.value = id
}
const cancelEditBudget = () => {
  id_edit.value = ""
}

const allCycle = ref([])
const cycle_selected = ref([])
const getAllCycleBudget = async () => {
  let url = process.env.VUE_APP_BASE_URL_API + '/' + Constant.pathGetAllCycleBudget
  let headers = {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token')).token}`,
  }
  isLoading.value = true
  const response = await service.get(url, {}, headers);
  isLoading.value = false
  if (response.data.returnCode == "200") {
    allCycle.value = response.data.data
    cycle_selected.value = allCycle.value.find(cycle => cycle.is_root == "1")
    keywordCycle.value = cycle_selected.value.id
    valueSeachCycle.value = cycle_selected.value.id
  }
}
getAllCycleBudget()

//update
const updateBudget = async () => {
  let id = id_edit.value
  let url = process.env.VUE_APP_BASE_URL_API + '/' + Constant.pathUpdateCustomerBudget
  let headers = {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token')).token}`,
  }
  let params = {
    id,
    advance_amount: helper.formatVNDtoNumber($('#' + id + '_advance_amount').val()),
    fee: helper.formatVNDtoNumber($('#' + id + '_fee').val()),
    fee_date: $('#' + id + '_fee_date').val(),
    default_video_quantity: $('#' + id + '_default_video_quantity').val(),
    additional_video_quantity: $('#' + id + '_additional_video_quantity').val(),
    additional_service_cost: helper.formatVNDtoNumber($('#' + id + '_additional_service_cost').val()),
    additional_service_note: $('#' + id + '_additional_service_note').val(),
    facebook_service_amount: helper.formatVNDtoNumber($('#' + id + '_facebook_service_amount').val()),
    tiktok_service_amount: helper.formatVNDtoNumber($('#' + id + '_tiktok_service_amount').val()),
    google_service_amount: helper.formatVNDtoNumber($('#' + id + '_google_service_amount').val()),
    zalo_service_amount: helper.formatVNDtoNumber($('#' + id + '_zalo_service_amount').val()),
    last_update_date: $('#' + id + '_last_update_date').val(),
    budget_per_day: helper.formatVNDtoNumber($('#' + id + '_budget_per_day').val()),
    status: $('#' + id + '_status').val(),
    ads_user_id: $('#' + id + '_ads_user_id').val(),
    sale_user_id: $('#' + id + '_sale_user_id').val()
  }
  isLoading.value = true
  const response = await service.put(url, params, headers)
  isLoading.value = false
  if (response.status == 200) {
    if (response.data.returnCode == 200) {
      Swal.fire('Thành Công', 'Sửa thông tin thành công!', 'success')
      id_edit.value = ""
      getAllCustomerBudget()
    } else {
      Swal.fire('Thất bại', 'Sửa thông tin thất bại!', 'error');
    }
  }
}

const create_cycle_name = ref("")
const create_is_root = ref("1")
const createCycleBudget = async () => {
  $('.error').remove();
  $('.input-change-border-error').removeClass("input-change-border-error border-top border-2 border-danger");
  let url = process.env.VUE_APP_BASE_URL_API + '/' + Constant.pathCreateCycleBudget
  let headers = {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token')).token}`
  }
  let params = {
    cycle_name: create_cycle_name.value,
    is_root: create_is_root.value,
  }
  isLoading.value = true
  const response = await service.post(url, params, headers)
  isLoading.value = false
  if (response.status == 200) {
    if (response.data.returnCode == 200) {
      $('#modalCreateBudget .close').click()
      Swal.fire('Thành Công', 'Sửa thông tin thành công!', 'success')
      getAllCycleBudget()
      getAllCustomerBudget()
    } else {
      Swal.fire('Thất bại', 'Sửa thông tin thất bại!', 'error')
    }
  } else if (response.status == 422) {
    $.each(response.data.data, function (key, value) {
      $('input[id=create_' + key + ']').parent().append('<p class="error padd-t-2" style="color: red; text-align: left; font-size: 12px">' + value + '</p>');
      $('input[id=create_' + key + ']').addClass("input-change-border-error border-top border-2 border-danger");
    });
  }
}

const update_cycle_name = ref("")
const update_is_root = ref("")
const updateCycleBudget = async () => {
  $('.error').remove();
  $('.input-change-border-error').removeClass("input-change-border-error border-top border-2 border-danger");
  let url = process.env.VUE_APP_BASE_URL_API + '/' + Constant.pathUpdateCycleBudget
  let headers = {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token')).token}`
  }
  let params = {
    id: cycle_selected.value.id,
    cycle_name: update_cycle_name.value,
    is_root: update_is_root.value,
  }
  isLoading.value = true
  const response = await service.put(url, params, headers)
  isLoading.value = false
  if (response.status == 200) {
    if (response.data.returnCode == 200) {
      $('#modalEditBudget .close').click()
      Swal.fire('Thành Công', 'Sửa thông tin thành công!', 'success')
      getAllCycleBudget()
    } else {
      Swal.fire('Thất bại', 'Sửa thông tin thất bại!', 'error')
    }
  } else if (response.status == 422) {
    $.each(response.data.data, function (key, value) {
      $('input[id=update_' + key + ']').parent().append('<p class="error padd-l-15 padd-t-2" style="color: red; text-align: left; font-size: 12px">' + value + '</p>');
      $('input[id=update_' + key + ']').addClass("input-change-border-error border-top border-2 border-danger");
    });
  }
}

const editCycleBudget = async () => {
  $('#modalEditBudget').modal().show()
}

const formatValue = (event) => {
  let number = event.target.value
  let cleanedAmount = number.replace(/[.,]/g, '');
  let formattedAmount = new Intl.NumberFormat('en-DE').format(cleanedAmount);
  event.target.value = formattedAmount
}

const div_table_budget = ref(null)
const active_fixed_header = ref(false)
const hanldeScroll = () => {
  if (div_table_budget.value.scrollTop > 0) {
    active_fixed_header.value = true
  } else {
    active_fixed_header.value = false
  }
}
</script>

<style scoped>
.table-custom-db { 
  overflow-y: auto;
  max-height: 700px;
}
td.fixed-scroll-x {
  position: sticky;
  position: -webkit-sticky;
  left: -1px;
  background-color: #FBFBFB;
}
th.fixed-scroll-x {
  position: sticky !important;
  position: -webkit-sticky;
  left: -1px;
  z-index: 1;
  background-color: #FBFBFB;
}
.table-custom-db .fixed-scroll-x::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-right: 1px solid #E4E4E4;
  box-sizing: border-box;
  pointer-events: none;
}
.table-custom-db thead {
  position: sticky;
  position: -webkit-sticky;
  top: -1px; 
  z-index: 2;
} 
.table-custom-db thead th::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-bottom:  1px solid #E4E4E4;
  box-sizing: border-box;
  pointer-events: none;
}
.fixed-header thead th{
  position: relative;
  background-color: #FBFBFB;
}
.title-quan-ly-nhan-vien {
  margin-left: 20px;
  color: var(--LEBER-Admin-Color---Secondary-texts, #666);
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 16px;
  /* 100% */
}
.title-budget {
  position: relative;
  min-width: 180px;
}
.title-budget .bg-edit {
  position: absolute;
  top: -5px;
  right: 0;
}
.button-edit-title {
  width: 19.189px;
  height: 20px;
  margin-left: 10px;
  cursor: pointer;
}
.container {
  display: inline-block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 14px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 18px;
  width: 18px;
  background-color: #eee;
  border-radius: 50%;
}
.container:hover input~.checkmark {
  background-color: #ccc;
}
.container input:checked~.checkmark {
  background-color: #00B2EE;
}
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}
.container input:checked~.checkmark:after {
  display: block;
}
.container .checkmark:after {
  top: 5.5px;
  left: 5.5px;
  width: 6.5px;
  height: 6.5px;
  border-radius: 50%;
  background: white;
}
.title-quan-ly-nhan-vien {
  justify-content: space-between;
}
.tr-budget:hover {
  background-color: #DBF6FF;
}
.tr-budget:hover td:first-child {
  background-color: #DBF6FF;
}
</style>