  <template>
  <div class="header-quan-ly-nhan-vien">
    <div class="search-quan-ly-nhan-vien">
      <input @keydown="loadingSearch()" v-model="keywordCustomerName" type="text" placeholder="Nhập tên khách hàng">
    </div>
    <div class="search-quan-ly-nhan-vien mar-l-15">
      <input @keydown="loadingSearch()" v-model="keywordSaleName" type="text" placeholder="Nhập Tên Tổng Phụ Trách">
    </div>
    <div class="search-quan-ly-nhan-vien mar-l-15">
      <select v-model="keywordStatus" class="form-control-cskh height-33">
        <option value="">Tất cả</option>
        <option value="0">Chưa chốt</option>
        <option value="1">Đã chốt</option>
        <option value="2">Đã hủy</option>
      </select>
    </div>
    <!-- <div><button style="margin-left: 20px;" @click="listCancel = !listCancel" class="btn btn-font-size btn-popup-set-success">{{ listCancel == true ? 'Đang hoạt động' : 'Đã hủy' }}</button></div> -->
    <div class="create-nhan-vien">
      <div class="create-products">
        <span><a href="#" data-toggle="modal" data-target="#modalCreateCustomer">+ Thêm cskh mới</a></span>
      </div>
    </div>
  </div>

  <div class="table table-quan-ly table-quan-ly-nhan-vien">
    <table>
      <thead>
        <tr>
          <th style="width: 60px;"></th>
          <th style="text-align: left; width: 20%">Tên khách hàng</th>
          <th style="min-width: 15%">Sale</th>
          <th style="min-width: 15%">SĐT</th>
          <th style="text-align: left; width: 10%">Tên công ty</th>
          <th style="min-width: 20%">Tiến độ chăm sóc khách hàng</th>
          <th style="min-width: 5%">Ngày gọi lại</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="customer in customers"
          :class="getHoursDifference(customer.callback_due_date) <= 0 && customer.deal_status == '0' ? 'bg-red-table-cuatom-care' : ''">
          <td>
            <a @click.prevent="getCustomerById(customer.id)" href="">
              <img style="margin-left: -10px" src="@/assets/images/edit.svg" alt="">
            </a>
          </td>
          <td style="text-align: left;">{{ customer.customer_name }}</td>
          <td><span>{{ customer.last_name }}</span></td>
          <td>{{ customer.phone_number }}</td>
          <td style="text-align: left">{{ customer.company_name }}</td>
          <td>
            <p class="space-wrap" style="text-align: left">{{ customer.care_progress }}</p>
          </td>
          <td class="min-width-120">{{ helper.formatDateTime(customer.callback_due_date, 'dd-MM-yyyy') }}</td>
          <td>
            <img v-if="UserStore.user.is_admin == '1' && customer.deal_status == '2'"
              @click="deleteCustomer(customer.id, customer.customer_name)"
              src="@/assets/images/thungrac.svg"
              class="cursor-pointer"
              style="right: 20px; top: 8px !important">
          </td>
        </tr>
      </tbody>
    </table>
    <div class="pagination-quanly-nhan-vien text-right mar-t-20">
      <div v-if="pageLink.length > 1" class="pagination">
        <a @click.prevent="changePage('prev')" href=""><img src="@/assets/images/pre.svg" alt=""></a>
        <a v-for="page in pageLink" :class="pageActive == page ? 'active' : ''" @click.prevent="changePage(page)"
          href="">{{ page }}</a>
        <a @click.prevent="changePage('next')" href="#"><img src="@/assets/images/next.svg" alt=""></a>
      </div>
    </div>
  </div>
  <!-- Modal -->
  <div class="modal fade" id="modalCreateCustomer" tabindex="-1" role="dialog" aria-labelledby="modalCreateCustomerLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalCreateCustomerLabel">Tạo cskh mới</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="one-row-cskh">
            <div class="title-cskh">
              <span>Tên khách hàng <span class="text-red">*</span></span>
            </div>
            <div class="content-cskh icon-content-cskh">
              <input v-model="customer_name" id="customer_name" type="text" class="form-control-cskh"
                placeholder="Nhập tên khách hàng">
            </div>
          </div>
          <div class="one-row-cskh">
            <div class="title-cskh">
              <span>Sale chăm sóc <span class="text-red">*</span></span>
            </div>
            <div class="content-cskh">
              <select v-model="sale_user_id" id="sale_user_id" placeholder="chọn nhận viên sale chăm sóc"
                class="form-control-cskh selectpicker" data-live-search="true">
                <option value="">Chọn sale chăm sóc</option>
                <option v-for="user in allUser" :value="user.id">
                  <span v-if="user.position != '' && user.position != null">[{{ user.position }}]</span> {{ user.last_name }}
                </option>
              </select>
            </div>
          </div>
          <div class="one-row-cskh">
            <div class="title-cskh">
              <span>Số điện thoại <span class="text-red">*</span></span>
            </div>
            <div class="content-cskh">
              <input v-model="phone_number" id="phone_number" type="text" class="form-control-cskh"
                placeholder="Số điện thoại">
            </div>
          </div>
          <div class="one-row-cskh">
            <div class="title-cskh">
              <span>Tên công ty</span>
            </div>
            <div class="content-cskh">
              <input v-model="company_name" id="company_name" type="text" class="form-control-cskh" placeholder="Tên công ty">
            </div>
          </div>
          <div class="one-row-cskh">
            <div class="title-cskh">
              <span>Nguồn <span class="text-red">*</span></span>
            </div>
            <div class="content-cskh">
              <select v-model="customer_source" id="customer_source" class="form-control-cskh selectpicker"
                data-live-search="true">
                <option value="1">Cá nhân</option>
                <option value="2">Công ty</option>
              </select>
            </div>
          </div>
          <div class="one-row-cskh">
            <div class="title-cskh">
              <span>Email</span>
            </div>
            <div class="content-cskh">
              <input v-model="email" id="email" type="text" class="form-control-cskh" placeholder="Email">
            </div>
          </div>
          <div class="one-row-cskh">
            <div class="title-cskh">
              <span>Địa chỉ</span>
            </div>
            <div class="content-cskh">
              <input v-model="address" id="address" type="text" class="form-control-cskh" placeholder="Địa chỉ">
            </div>
          </div>
          <div class="one-row-cskh">
            <div class="title-cskh">
              <span>Tiến độ chăm sóc <span class="text-red">*</span></span>
            </div>
            <div class="content-cskh">
              <textarea v-model="care_progress" id="care_progress" class="form-control-cskh" cols="30" rows="10"
                style="height: 80px;"></textarea>
            </div>
          </div>
          <div class="one-row-cskh">
            <div class="title-cskh">
              <span>Ngày gọi lại <span class="text-red">*</span></span>
            </div>
            <div class="content-cskh">
              <input v-model="callback_due_date" id="callback_due_date" type="date" class="form-control-cskh"
                placeholder="Nguồn">
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-popup btn-popup-set-cancel" data-dismiss="modal">Hủy bỏ</button>
          <button @click.prevent="createCustomer()" type="button" class="btn btn-popup btn-popup-set-success">Lưu</button>
        </div>
      </div>
    </div>
  </div>


  <div class="modal fade" id="modalUpdateCustomer" tabindex="-1" role="dialog" aria-labelledby="modalUpdateCustomerLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalUpdateCustomerLabel">Tạo cskh mới</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="one-row-cskh">
            <div class="title-cskh">
              <span>Tên khách hàng <span class="text-red">*</span></span>
            </div>
            <div class="content-cskh icon-content-cskh">
              <input v-model="update_customer_name" id="update_customer_name" type="text" class="form-control-cskh"
                placeholder="Nhập tên khách hàng">
            </div>
          </div>
          <div class="one-row-cskh">
            <div class="title-cskh">
              <span>Sale chăm sóc <span class="text-red">*</span></span>
            </div>
            <div class="content-cskh">
              <select v-model="update_sale_user_id" id="update_sale_user_id" placeholder="chọn nhận viên sale chăm sóc"
                class="form-control-cskh selectpicker" data-live-search="true">
                <option value="">Chọn sale chăm sóc</option>
                <option v-for="user in allUser" :value="user.id">
                  <span v-if="user.position != '' && user.position != null">[{{ user.position }}]</span> {{ user.last_name }}
                </option>
              </select>
            </div>
          </div>
          <div class="one-row-cskh">
            <div class="title-cskh">
              <span>Số điện thoại <span class="text-red">*</span></span>
            </div>
            <div class="content-cskh">
              <input v-model="update_phone_number" id="update_phone_number" type="text" class="form-control-cskh"
                placeholder="Số điện thoại">
            </div>
          </div>
          <div class="one-row-cskh">
            <div class="title-cskh">
              <span>Tên công ty</span>
            </div>
            <div class="content-cskh">
              <input v-model="update_company_name" id="update_company_name" type="text" class="form-control-cskh"
                placeholder="Tên công ty">
            </div>
          </div>
          <div class="one-row-cskh">
            <div class="title-cskh">
              <span>Nguồn <span class="text-red">*</span></span>
            </div>
            <div class="content-cskh">
              <select v-model="update_customer_source" id="update_customer_source" class="form-control-cskh selectpicker"
                data-live-search="true">
                <option value="1">Cá nhân</option>
                <option value="2">Công ty</option>
              </select>
            </div>
          </div>
          <div class="one-row-cskh">
            <div class="title-cskh">
              <span>Email</span>
            </div>
            <div class="content-cskh">
              <input v-model="update_email" id="update_email" type="text" class="form-control-cskh" placeholder="Email">
            </div>
          </div>
          <div class="one-row-cskh">
            <div class="title-cskh">
              <span>Địa chỉ</span>
            </div>
            <div class="content-cskh">
              <input v-model="update_address" id="update_address" type="text" class="form-control-cskh"
                placeholder="Địa chỉ">
            </div>
          </div>
          <div class="one-row-cskh">
            <div class="title-cskh">
              <span>Tiến độ chăm sóc <span class="text-red">*</span></span>
            </div>
            <div class="content-cskh">
              <textarea v-model="update_care_progress" id="update_care_progress" class="form-control-cskh" cols="30"
                rows="10" style="height: 80px;"></textarea>
            </div>
          </div>
          <div class="one-row-cskh">
            <div class="title-cskh">
              <span>Trạng thái <span class="text-red">*</span></span>
            </div>
            <div class="content-cskh">
              <select v-model="update_deal_status" id="update_deal_status" placeholder="Trạng thái"
                class="form-control-cskh selectpicker" data-live-search="true">
                <option value="0">Chưa chốt</option>
                <option value="1">Đã chốt</option>
                <option value="2">Đã hủy</option>
              </select>
            </div>
          </div>
          <div class="one-row-cskh">
            <div class="title-cskh">
              <span>Ngày gọi lại <span class="text-red">*</span></span>
            </div>
            <div class="content-cskh">
              <input v-model="update_callback_due_date" id="update_callback_due_date" type="date"
                class="form-control-cskh" placeholder="Nguồn">
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-popup btn-popup-set-cancel" data-dismiss="modal">Hủy bỏ</button>
          <button @click.prevent="updateCustomer()" type="button" class="btn btn-popup btn-popup-set-success">Cập
            nhật</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, inject, ref, watch } from "vue"
import service from "../services/service"
import { useRouter } from 'vue-router'
import $ from 'jquery'
import Swal from 'sweetalert2'
import { differenceInHours, parse } from 'date-fns'
import helper from '@/services/helper'
import { userStore } from "@/store/modules/userStore"

const UserStore = userStore()
const Constant = inject("$constant")
const isLoading = inject('isLoading')

//setting page
const pageActive = ref(1)
const countRow = ref(20)
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
const keywordCustomerName = ref("")
const keywordSaleName = ref("")
const loadingSearch = () => {
  clearTimeout(typingTimerOn)
  clearTimeout(typingTimerOff)
  typingTimerOn = setTimeout(() => {
    isLoading.value = true
  }, 1000)

  typingTimerOff = setTimeout(() => {
    isLoading.value = false
    searchByCustomerName.value = keywordCustomerName.value
    searchBySaleName.value = keywordSaleName.value
  }, 1500)
}
const keywordStatus = ref("0")
watch([keywordStatus], () => {
  isLoading.value = true
  setTimeout(() => {
    searchByStatus.value = keywordStatus.value
    isLoading.value = false
  }, 500)
})
//fillter data
const listCancel = ref(false)
const searchByCustomerName = ref('')
const searchBySaleName = ref('')
const searchByStatus = ref("0")
const customerFillter = computed(() => {
  let customers = allCustomer.value
  if (searchByStatus.value != "") {
    customers = customers.filter(customer => customer.deal_status == searchByStatus.value)
  }
  if (UserStore.user.is_admin == "0") {
    customers = customers.filter(customer => customer.sale_user_id == UserStore.user.id)
  }
  customers = customers.filter(customer => (customer.first_name.toUpperCase() + " " + customer.customer_name.toUpperCase()).includes(searchByCustomerName.value.toUpperCase()))
  customers = customers.filter(customer => (customer.first_name.toUpperCase() + " " + customer.last_name.toUpperCase()).includes(searchBySaleName.value.toUpperCase()))
  return customers
})
const customers = computed(() => {
  let customers = customerFillter.value
  customers = customers.filter((customer, idx) =>
    idx >= (pageActive.value - 1) * countRow.value
    && idx < pageActive.value * countRow.value
    )
  return customers
})
const pageLink = computed(() => {
  let pageLink = []
  const countPage = Math.ceil(customerFillter.value.length / countRow.value)
  for (let i = 1; i <= countPage; i++) {
    pageLink.push(i)
  }
  return pageLink
})

//get all data
const allCustomer = ref([])
const getAllCustomer = async () => {
  let url = process.env.VUE_APP_BASE_URL_API + '/' + Constant.pathGetAllCustomer
  let headers = {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token')).token}`,
  }
  isLoading.value = true
  const response = await service.get(url, {}, headers);
  isLoading.value = false
  if (response.data.returnCode == "200") {
    allCustomer.value = response.data.data
  }
}
getAllCustomer()

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

//params create
const sale_user_id = ref("")
const customer_name = ref("")
const phone_number = ref("")
const company_name = ref("")
const customer_source = ref("2")
const email = ref("")
const address = ref("")
const care_progress = ref("")
const deal_status = ref("0")
const callback_due_date = ref("")
const createCustomer = async () => {
  $('.error').remove();
  $('.input-change-border-error').removeClass("input-change-border-error border-top border-2 border-danger");
  let url = process.env.VUE_APP_BASE_URL_API + '/' + Constant.pathCreateCustomer
  let headers = {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token')).token}`,
  }
  let params = {
    sale_user_id: sale_user_id.value,
    customer_name: customer_name.value,
    phone_number: phone_number.value,
    company_name: company_name.value,
    customer_source: customer_source.value,
    email: email.value,
    address: address.value,
    care_progress: care_progress.value,
    deal_status: deal_status.value,
    callback_due_date: callback_due_date.value
  }
  isLoading.value = true
  const response = await service.post(url, params, headers)
  isLoading.value = false
  if (response.status == 200) {
    if (response.data.returnCode == 200) {
      Swal.fire('Thành Công', 'Tạo chăm sóc khách hàng thành công!', 'success').then((result) => {
        window.location.reload()
      })
    } else {
      Swal.fire('Thất bại', 'Tạo chăm sóc khách hàng thất bại!', 'error');
    }
  } else if (response.status == 422) {
    $.each(response.data.data, function (key, value) {
      $('#' + key).parent().append('<p class="error padd-t-2" style="color: red; text-align: left; font-size: 12px;">' + value + '</p>');
      $('#' + key).addClass("input-change-border-error border-top border-2 border-danger");
    });
  }
}

const getCustomerById = async (id) => {
  let url = process.env.VUE_APP_BASE_URL_API + '/' + Constant.pathGetCustomerInfo + '/' + id
  let headers = {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token')).token}`,
  }
  isLoading.value = true
  const response = await service.get(url, {}, headers);
  isLoading.value = false
  if (response.data.returnCode == "200") {
    update_customer_id.value = response.data.data.customer.id
    update_sale_user_id.value = response.data.data.customer.sale_user_id
    update_customer_name.value = response.data.data.customer.customer_name
    update_phone_number.value = response.data.data.customer.phone_number
    update_company_name.value = response.data.data.customer.company_name
    update_customer_source.value = response.data.data.customer.customer_source
    update_email.value = response.data.data.customer.email
    update_address.value = response.data.data.customer.address
    update_care_progress.value = response.data.data.customer.care_progress
    update_deal_status.value = response.data.data.customer.deal_status
    const dateTimeObject = new Date(response.data.data.customer.callback_due_date)
    const year = dateTimeObject.getFullYear()
    const month = (dateTimeObject.getMonth() + 1).toString().padStart(2, '0')
    const day = dateTimeObject.getDate().toString().padStart(2, '0')
    const formattedDateString = `${year}-${month}-${day}`
    update_callback_due_date.value = formattedDateString
    $("#modalUpdateCustomer").modal().show()
  }
}
//params update
const update_customer_id = ref("")
const update_sale_user_id = ref("")
const update_customer_name = ref("")
const update_phone_number = ref("")
const update_company_name = ref("")
const update_customer_source = ref("")
const update_email = ref("")
const update_address = ref("")
const update_care_progress = ref("")
const update_deal_status = ref("")
const update_callback_due_date = ref("")

const updateCustomer = async () => {
  $('.error').remove();
  $('.input-change-border-error').removeClass("input-change-border-error border-top border-2 border-danger");
  let url = process.env.VUE_APP_BASE_URL_API + '/' + Constant.pathUpdateCustomer
  let headers = {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token')).token}`,
  }
  let params = {
    id: update_customer_id.value,
    sale_user_id: update_sale_user_id.value,
    customer_name: update_customer_name.value,
    phone_number: update_phone_number.value,
    company_name: update_company_name.value,
    customer_source: update_customer_source.value,
    email: update_email.value,
    address: update_address.value,
    care_progress: update_care_progress.value,
    deal_status: update_deal_status.value,
    callback_due_date: update_callback_due_date.value
  }
  isLoading.value = true
  const response = await service.put(url, params, headers)
  isLoading.value = false
  if (response.status == 200) {
    if (response.data.returnCode == 200) {
      Swal.fire('Thành Công', 'Cập nhật khách hàng thành công!', 'success').then((result) => {
        window.location.reload()
      })
    } else {
      Swal.fire('Thất bại', 'Cập nhật khách hàng thất bại!', 'error');
    }
  } else if (response.status == 422) {
    $.each(response.data.data, function (key, value) {
      $('#update_' + key).parent().append('<p class="error padd-t-2" style="color: red; text-align: left; font-size: 12px">' + value + '</p>');
      $('#update_' + key).addClass("input-change-border-error border-top border-2 border-danger");
    });
  }
}

const deleteCustomer = async (customer_id, customer_name) => {
  Swal.fire({
    title: 'Xóa khách hàng',
    text: `Bạn có chắc chắn muốn xóa khách hàng ${customer_name} ?`,
    icon: 'question',
    showCancelButton: true,
    showConfirmButton: true,  
    confirmButtonText: 'Xóa',
    cancelButtonColor: '#E0E0E0',
    cancelButtonText: 'Không xóa',
    customClass:  'my-confirm-header-task-detail'
  }).then( async (result) => {
    if (result.isConfirmed) {
      let url = process.env.VUE_APP_BASE_URL_API + '/' + Constant.pathDeleteCustomer
      let headers = {
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token')).token}`
      }
      let params = {
        id: customer_id
      }
      isLoading.value = true
      const response = await service.delete(url, params, headers)
      isLoading.value = false
      if (response.status == 200) {
        if (response.data.returnCode == 200) {
          getAllCustomer()
          Swal.fire('Thành công', response.data.message, 'success')
        } else {
          Swal.fire('Thất bại', response.data.message, 'error');
        }
      }
    }
  });
}

const getHoursDifference = (date) => {
  const targetDateTime = parse(date, 'yyyy-MM-dd HH:mm:ss', new Date());
  const hoursDifference = differenceInHours(targetDateTime, new Date())
  return hoursDifference
}
</script>
<style scoped></style>