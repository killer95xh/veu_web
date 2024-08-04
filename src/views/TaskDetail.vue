<template>
  <div class="content-ocean">
    <HeaderTaskDetail :task="task" @getTaskInfo="getTaskInfo"/>
    <!-- Begin Bieu do tien do du an -->
    <div class="project-progress display-flex">
      <div class="left-project">
        <h4 class="title-tien-do-du-an">
          Tiến độ dự án
        </h4>
        <Chart :task="task" :list_sub_task="list_sub_task" />
      </div>
      <div class="right-project">
        <div class="row-detail display-flex mar-t-5">
          <div class="text-row text-row-detail padd-t-10">
            <p>Tổng phụ trách</p>
          </div>
          <div v-if="is_update_task == 'task_supervisor'" class="icon-content-cskh text-row-right text-row-detail padd-l-0 mar-l-20 mar-t-5">
            <div id="task_supervisor_user_id"  class="form-control-cskh padd-4" style="width: 300px;height: auto;" @click="toggleDropdown('myDropdown-tpt-ocean')">
              <span v-if="update_task_supervisor == null"> <span v-if="task.task_supervisor_position != null && task.task_supervisor_position != ''">[{{ task.task_supervisor_position }}]</span> {{ task.task_supervisor_last_name }}</span>
              <span v-else><span v-if="update_task_supervisor.position != null && update_task_supervisor.position != ''">[{{ update_task_supervisor.position }}]</span> {{ update_task_supervisor.last_name }}</span>
              <img src="@/assets/images/book.svg" alt="">
            </div>
            <div id="myDropdown-tpt-ocean" class="dropdown-content-ocean">
              <div class="position-relative div-search-ocean">
                <input v-model="searchUserByLastName" type="text" class="input-search-ocean">
              </div>
              <div class="list-item-search-ocean">
                <li v-for="user in fillterListUser"
                  @click="update_task_supervisor = {id: user.id, position: user.position, last_name: user.last_name}, toggleDropdown('myDropdown-tpt-ocean')"
                  class="li-item-search">
                  <span v-if="user.position != '' && user.position != null"> [{{ user.position }}]</span>  {{ user.last_name }}
                </li>
              </div>
            </div>
          </div>
          <div v-else class="position-relative edit-bg-ocean-span width-detailtask">
            <div class="cursor-pointer" @click="is_update_task = is_update_task != 'task_supervisor' && (UserStore.user.is_admin == '1' || UserStore.user.id == task.task_supervisor_user_id) ? 'task_supervisor' : ''">
              <img :src="convertUrlAvatar(task.task_supervisor_url_avatar)" alt="avatar" class="border-radius width-height-svg">
              <span class="span-avatar-detailtask"> <span v-if="task.task_supervisor_position != null && task.task_supervisor_position != ''">[{{ task.task_supervisor_position }}]</span> {{ task.task_supervisor_last_name }}</span>
            </div>
          </div>
        </div>

        <div class="row-detail display-flex mar-t-15">
          <div class="text-row text-row-detail no-padding">
            <p>Độ ưu tiên</p>
          </div>
          <div v-if="is_update_task == 'priority_level'" class="mar-l-20 text-row-detail">
            <select v-model="update_task_priority_level" class="form-control-cskh width-150">
              <option value="1">Thấp</option>
              <option value="2">Bình Thường</option>
              <option value="3">Cao</option>
              <option value="4">Rất cao</option>
            </select>
          </div>
          <div v-else class="mar-l-15 cursor-pointer" @click="is_update_task = is_update_task != 'priority_level' && (UserStore.user.is_admin == '1' || UserStore.user.id == task.task_supervisor_user_id) ? 'priority_level' : ''">
            <span v-if="task.priority_level == '1'" class="text-red edit-bg-ocean-span">Thấp</span>
            <span v-else-if="task.priority_level == '2'" class="text-red edit-bg-ocean-span">Bình thường</span>
            <span v-else-if="task.priority_level == '3'" class="text-red edit-bg-ocean-span">Cao</span>
            <span v-else-if="task.priority_level == '4'" class="text-red edit-bg-ocean-span">Rất cao</span>
          </div>
        </div>

        <div class="row-detail display-flex mar-t-10">
          <div class="text-row text-row-detail">
            <p>Thời gian hợp đồng</p>
          </div>
          <div v-if="is_update_task == 'deadline'" class="content-cskh mar-l-20 text-row-detail display-flex">
            <div class="date-one width-150">
              <input v-model="update_task_contract_start_date" type="date"
                class="form-control-cskh width-100" placeholder="Lựa chọn">
            </div>
            <div class="width-150 mar-l-10">
              <input v-model="update_task_contract_end_date" type="date" class="form-control-cskh width-100"
                placeholder="Lựa chọn">
            </div>
          </div>
          <div v-else class="mar-l-15 text-row-detail cursor-pointer edit-bg-ocean-span padd-5" @click="is_update_task = is_update_task != 'deadline' && (UserStore.user.is_admin == '1' || UserStore.user.id == task.task_supervisor_user_id) ? 'deadline' : ''">
            <span>{{ helper.formatDateTime(task.contract_start_date, 'dd-MM-yyyy') }} ~ {{ helper.formatDateTime(task.contract_end_date, 'dd-MM-yyyy') }}</span>
          </div>
        </div>

        <div class="row-detail display-flex mar-t-10">
          <div class="text-row text-row-detail no-padding">
            <p>Trạng thái</p>
          </div>
          <div class="text-row-detail padd-l-20">
            <span v-if="task.status == '1'">Đang chạy Ads</span>
            <span v-else-if="task.status == '2'">Đang thực hiện</span>
            <span v-else-if="task.status == '3'">Chưa triển khai</span>
            <span v-else-if="task.status == '4'">Đã tạm dừng</span>
          </div>
        </div>
        <div v-if="is_update_task != ''" class="mar-t-20">
          <button @click="updateTask()" class="btn btn-font-size btn-popup-set-success">Cập nhật</button>
          <button @click="is_update_task = ''" class="btn btn-font-size btn-popup-set-cancel mar-l-15">Hủy bỏ</button>
        </div>
      </div>
    </div>
    <div class="project-progress display-flex mar-b-15 mar-t-15">
      <div class="left-project-btn">
        <div class="form-btn-detail display-flex">
          <div type="button" @click.prevent="createSubTaskAds()" class="btn-detail btn-left-detail"><span>Chạy Ads</span></div>
          <div v-if="task.status == '4'" @click="updateStatusTask('3')"
            class="btn-detail btn-right-detail" type="button"><span>Khởi động lại dự án</span></div>
          <div v-else @click="updateStatusTask('4')" class="btn-detail btn-right-detail" type="button"><span>Hoàn Thành</span></div>
        </div>
      </div>
    </div>
    <!-- End Bieu do tien do du an -->
    <div class="table-detail">
      <CreateSubTask :task="task" :allUser="allUser" @getListSubTask="getListSubTask" @getTaskInfo="getTaskInfo"/>
      <div class="table table-quan-ly table-detail table-bg-ocean">
        <table>
          <thead>
            <tr>
              <th style="width: 20px"></th>
              <th style="text-align: left">Tên công việc <img @click="toggleSort(), sortBy = 'sub_task_name'" src="@/assets/images/sort-table.svg" alt=""></th>
              <th>Deadline <img @click="toggleSort(), sortBy = 'deadline_end_date'" src="@/assets/images/sort-table.svg" alt=""></th>
              <th>Tiến độ</th>
              <th>Trạng thái</th>
              <th>Ưu Tiên</th>
              <th>Trưởng phòng</th>
              <th>Nhân viên</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="subTask in list_sub_task_sort" class="table-bg">
              <td>
                <div v-if="warningDeadline(subTask) < 3 * 24 && subTask.status != '6' && subTask.status != '6'" class="canh-bao-detail">
                  <img src="@/assets/images/error.svg" alt="">
                  <div class="thong-bao-den-han-detail">
                    <div class="position-relative alert-hover">
                      <img src="@/assets/images/tooltip.svg" alt="">
                      <span v-if="warningDeadline(subTask)  >= 0" class="text-thong-bao-detail position-absolute text-red">
                        còn {{ Math.ceil(warningDeadline(subTask) / 24) }} ngày nữa là đến deadline.
                      </span>
                      <span v-else class="text-thong-bao-detail position-absolute text-red">
                        đã quá deadline {{ Math.ceil((warningDeadline(subTask) / 24) * -1) }} ngày.
                      </span>
                    </div>
                  </div>
                </div>
              </td>
              <td style="text-align: left" @click="showModalDetailSubTask(subTask.id)" class="text-detail cursor-pointer">
                {{ subTask.sub_task_name }}
              </td>
              <td :class="warningDeadline(subTask) < 3 * 24 && subTask.status != '6' ? 'text-red' : ''">{{ helper.formatDateTime(subTask.deadline_end_date, 'HH:mm dd-MM-yyyy') }}</td>
              <td>{{ subTask.progress }}%</td>
              <td v-if="subTask.status == '1'">Chưa triển khai</td>
              <td v-else-if="subTask.status == '2'">Làm lại</td>
              <td v-else-if="subTask.status == '3'">Đang thực hiện</td>
              <td v-else-if="subTask.status == '4'">Chờ xét duyệt</td>
              <td v-else-if="subTask.status == '5'">Đã xét duyệt</td>
              <td v-else-if="subTask.status == '6'">Đã bàn giao</td>
              <td v-else></td>
              <td v-if="subTask.priority_level == '1'">Thấp</td>
              <td v-else-if="subTask.priority_level == '2'">Bình thường</td>
              <td v-else-if="subTask.priority_level == '3'">Cao</td>
              <td v-else-if="subTask.priority_level == '4'">Rất cao</td>
              <td v-else></td>
              <td><span v-if="subTask.leader_position != null && subTask.leader_position != ''">[{{ subTask.leader_position }}]</span> {{ subTask.leader_last_name }}</td>
              <td><span v-for="emp in subTask.list_employee" class="ml-2"> <span v-if="emp.postion != '' && emp.postion != null">[{{ emp.postion }}]</span>  {{ emp.last_name }}</span></td>
              <td><img v-if="UserStore.user.is_admin == '1' || UserStore.user.id == task.task_supervisor_user_id || UserStore.user.id == subTask.leader_user_id" @click="deleteSubTask(subTask.id, subTask.sub_task_name)" src="@/assets/images/thungrac.svg" class="cursor-pointer" style="right: 20px"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- Begin Modal giai doan len ke hoach -->
  <div class="modal fade" id="createSubTaskModal-len-ke-hoach" tabindex="-1" role="dialog"
    aria-labelledby="createSubTaskModalLabel-kehoach" aria-hidden="true">
    <div class="modal-dialog modal-xl modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <span ref="input_sub_task_name" v-if="is_update_sub_task == 'sub_task_name'">
            <input ref="input_sub_task_name" v-model="update_sub_task_name" type="text" class="form-control-cskh" placeholder="Nhập tên công việc">
          </span>
          <span v-else class="modal-title"
            :class="UserStore.user.is_admin == '1' || UserStore.user.id == task.task_supervisor_user_id || UserStore.user.id == sub_task_detail.leader_user_id ? 'cursor-pointer edit-bg-ocean-span' : ''"
            id="createSubTaskModalLabel-kehoach"
            @click="UserStore.user.is_admin == '1' || UserStore.user.id == task.task_supervisor_user_id || UserStore.user.id == sub_task_detail.leader_user_id ? changeFieldUpdate('sub_task_name', 10) : ''"  >
            Công việc {{ sub_task_detail.sub_task_name }}
          </span>
          <span v-if="UserStore.user.is_admin == '1' || UserStore.user.id == task.task_supervisor_user_id || UserStore.user.id == sub_task_detail.leader_user_id" class="ml-3">
            <img @click="deleteSubTask(sub_task_detail.id, sub_task_detail.sub_task_name)" src="@/assets/images/thungrac.svg" class="cursor-pointer">
          </span>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body no-padding">
          <div class="content-create-du-an">
            <div class="create-detail-left border-right-modal width-total-70 position-relative">
              <div class="div-one">
                <h4 class="title-div-one">Chi tiết</h4>
                <template v-if="is_update_sub_task == 'description' || is_update_sub_task == 'file_sub_task'">
                  <div ref="input_description">
                    <textarea v-model="update_sub_task_description" cols="30" rows="10" class="form-control-cskh" style="; height: 200px;border-radius: 5px;margin: 15px 0px 5px 0px;"></textarea>
                  </div>
                  <!-- Icon add IMG chi tiet -->
                  <div ref="input_file" class="item-file-show">
                    <div class="custom-file-top">
                      <img class="img-in-one" src="@/assets/images/addfile.svg" alt="addfile">
                      <input type="file" class="custom-file-input-top" accept="image/*" id="file-sub-task" multiple @change="uploadFileSubTask($event)">
                    </div>
                    <div class="show-text-add-file-top">
                      <div style="position: absolute;right: -103px;top: -42px;">
                        <span style="position:absolute;right: 24px;top: 15px;font-size: 14px;">Tệp Đính Kèm</span>
                        <img src="@/assets/images/Union.svg" alt="">
                      </div>
                    </div>
                  </div>
                  <!-- End ICON add IMG chi tiet -->
                </template>
                <template v-else>
                  <div v-if="sub_task_detail.description != null" class="text-div-one padd-l-15 cursor-pointer height-chitiet space-wrap" @click="UserStore.user.is_admin == '1' || UserStore.user.id == task.task_supervisor_user_id || UserStore.user.id == sub_task_detail.leader_user_id ? changeFieldUpdate('description', 10) : ''"  id="sub-task-detail-des">
                    {{ getSubTaskDetailDescription() }}
                  </div>
                  <div v-else class="text-no-data mar-t-15" @click="UserStore.user.is_admin == '1' || UserStore.user.id == task.task_supervisor_user_id || UserStore.user.id == sub_task_detail.leader_user_id ? changeFieldUpdate('description', 10) : ''">Thêm chi tiết công việc</div>
                </template>
                
                <div class="list-file-show display-flex position-relative">
                  <div id="list-img-upload" class="display-flex">
                    <li v-for="file in sub_task_file_attachments" class="position-relative">
                      <img :src="helper.getPathImage(file.path)" alt="name_img" class="img-click-view" @click="showImgPopup($event , '#createSubTaskModal-len-ke-hoach')">
                      <div v-if="is_update_sub_task == 'description' || is_update_sub_task == 'file_sub_task'" class='remove-list' @click.stop="removeSubTaskFile($event, file.id)"><span class='close-remove'>x</span></div>
                    </li>
                  </div>
                </div>
              </div>
              <hr class="hr-my-set mar-t-0">
              <div class="div-two">
                <div class="btn-div-two display-flex padd-15">
                  <div class="padd-t-7 padd-r-15">Hoạt động</div>
                  <div id="div-comment" class="btn-tab" @click="tabShowDetail($event)">Bình luận</div>
                  <div id="div-history" class="btn-tab" @click="tabShowDetail($event)">Lịch sử hoạt động</div>
                </div>
                <SubTaskComment :sub_task_detail="sub_task_detail" :allUser="allUser" :usersInTask="usersInTask" />
                <!-- Begin div History -->
                <div id="div-historyC" class="div-tab display-none mar-t-20">
                  <div class="set-height-auto table table-quan-ly table-detail table-bg-ocean table-history">
                    <table>
                      <thead>
                        <tr>
                          <th>Nội dung</th>
                          <th>Thời gian</th>
                        </tr>
                      </thead>
                      
                        <tbody>
                          <tr v-for="history in histories" class="table-bg">
                            <td
                              v-if="new Date(history.created_at) > new Date(time_change_noti_and_history)"
                              v-html="getHtmlHistory(history.type, history.params)">
                            </td>
                            <td v-else v-html="history.content">
                            </td>
                            <td class="text-red">{{ helper.formatDateTime(history.created_at, 'HH:mm:ss dd-MM-yyyy') }}</td>
                          </tr>
                        </tbody>
                    </table>
                  </div>
                </div>
                <!-- End div History -->

              </div>
            </div>
            <div class="create-detail-right padd-5 project-detail-create width-total-30">
              <div class="one-row-cskh row-datepicker mar-t-10">
                <div class="title-detail width-40">
                  <span>Trạng thái</span>
                </div>
                <div v-if="is_update_sub_task == 'status'" class="content-detail-right">
                  <select ref="input_status" v-model="update_sub_task_status" class="form-control-cskh" @change="updateSubTask()">
                    <option value="1">Chưa triển khai</option>
                    <option value="2">Làm lại</option>
                    <option value="3">Đang thực hiện</option>
                    <option value="4">Chờ xét duyệt</option>
                    <option v-if="UserStore.user.is_admin == '1' || UserStore.user.id == task.task_supervisor_user_id || UserStore.user.id == sub_task_detail.leader_user_id" value="5">Đã xét duyệt</option>
                    <option v-if="UserStore.user.is_admin == '1' || UserStore.user.id == task.task_supervisor_user_id" value="6">Đã bàn giao</option>
                  </select>
                </div>
                <div v-else class="content-detail-right btn-font-size display-flex cursor-pointer edit-bg-ocean"
                  @click="changeFieldUpdate('status', 10)">
                    <span class="padd-t-8 mar-l-10" v-if="sub_task_detail.status == '1'">Chưa triển khai</span>
                    <span class="padd-t-8 mar-l-10" v-else-if="sub_task_detail.status == '2'">Làm lại</span>
                    <span class="padd-t-8 mar-l-10" v-else-if="sub_task_detail.status == '3'">Đang thực hiện</span>
                    <span class="padd-t-8 mar-l-10" v-else-if="sub_task_detail.status == '4'">Chờ xét duyệt</span>
                    <span class="padd-t-8 mar-l-10" v-else-if="sub_task_detail.status == '5'">Đã xét duyệt</span>
                    <span class="padd-t-8 mar-l-10" v-else-if="sub_task_detail.status == '6'">Đã bàn giao</span>
                    <span class="padd-t-8 mar-l-10" v-else></span>
                </div>
              </div>

              <div class="one-row-cskh row-datepicker mar-t-10">
                <div class="title-detail width-40">
                  <span>Khối lượng CV</span>
                </div>
                <div v-if="is_update_sub_task == 'progress'" class="content-detail-right display-flex content-date-detail btn-font-size">
                  <input ref="input_progress_completed" v-model="update_sub_task_progress_completed" type="text" class="form-control-cskh">
                  <span class="span-td">/</span>
                  <input ref="input_progress_target" v-model="update_sub_task_progress_target" type="text" class="form-control-cskh">
                </div>
                <div v-else class="content-detail-right btn-font-size display-flex content-date-detail cursor-pointer edit-bg-ocean" @click="changeFieldUpdate('progress', 10)" >
                  <span class="padd-t-8 mar-l-10">{{ sub_task_detail.progress_completed }}/{{ sub_task_detail.progress_target }}</span>
                </div>
              </div>

              <div class="one-row-cskh row-datepicker mar-t-10">
                <div class="title-detail width-40">
                  <span>Tên công việc</span>
                </div>
                <div v-if="is_update_sub_task == 'progress_type'" ref="input_progress_type"  class="content-detail-right display-flex content-date-detail btn-font-size">
                  <input v-model="update_sub_task_progress_type" type="text" class="form-control-cskh" placeholder="Tên công việc">
                </div>
                <div v-else @click="changeFieldUpdate('progress_type', 10)" class="content-detail-right btn-font-size display-flex content-date-detail cursor-pointer edit-bg-ocean">
                  <span class="padd-t-8 mar-l-10">{{ sub_task_detail.progress_type }}</span>
                </div>
              </div>

              <!-- HTML deadline chi tiet -->
              <div class="one-row-cskh row-datepicker mar-t-10">
                <div class="title-detail width-40">
                  <span>Deadline</span>
                </div>
                <div v-if="is_update_sub_task == 'deadline'" class="content-detail-right display-flex content-date-detail btn-font-size" ref="input_deadline" >
                  <!-- <input ref="input_deadline" @change="updateSubTask()" v-model="update_sub_task_deadline" type="datetime-local" class="form-control-cskh"> -->
                  <input v-model="update_sub_task_deadline" name="update_deadline_end_date" type="text" class="datetimepicker form-control-cskh" readonly="readonly">
                </div>
                <div v-else @click="UserStore.user.is_admin == '1' || UserStore.user.id == task.task_supervisor_user_id || UserStore.user.id == task.task_supervisor_user_id ? changeFieldUpdate('deadline', 10) : ''" class="content-detail-right btn-font-size display-flex content-date-detail cursor-pointer edit-bg-ocean">
                  <span class="padd-t-8 mar-l-10">{{ helper.formatDateTime(sub_task_detail.deadline_end_date, 'HH:mm dd-MM-yyyy') }}</span>
                </div>
              </div>
              <!-- END HTML deadline chi tiet -->

              <div class="one-row-cskh row-datepicker mar-t-10">
                <div class="title-detail width-40">
                  <span>Ưu tiên</span>
                </div>
                <div v-if="is_update_sub_task == 'priority_level'" class="content-detail-right btn-font-size display-flex">
                  <select ref="input_priority_level" v-model="update_sub_task_priority_level" @change="updateSubTask()" class="form-control-cskh">
                    <option value="1">Thấp</option>
                    <option value="2">Bình thường</option>
                    <option value="3">Cao</option>
                    <option value="4">Rất cao</option>
                  </select>
                </div>
                <div v-else class="content-detail-right btn-font-size display-flex cursor-pointer edit-bg-ocean" @click="changeFieldUpdate('priority_level', 10)">
                  <span v-if="sub_task_detail.priority_level == '1'" class="padd-t-8 mar-l-10 text-red">Thấp</span>
                  <span v-else-if="sub_task_detail.priority_level == '2'" class="padd-t-8 mar-l-10 text-red">Bình thường</span>
                  <span v-else-if="sub_task_detail.priority_level == '3'" class="padd-t-8 mar-l-10 text-red">Cao</span>
                  <span v-else-if="sub_task_detail.priority_level == '4'" class="padd-t-8 mar-l-10 text-red">Rất cao</span>
                  <span v-else class="padd-t-8 text-red"></span>
                </div>
              </div>

              <div class="one-row-cskh mar-t-10">
                <div class="title-detail width-40">
                  <span>Trưởng phòng</span>
                </div>
                <div ref="input_leader" v-if="is_update_sub_task == 'leader'" class="content-cskh icon-content-cskh content-detail-right btn-font-size">
                  <div id="task_supervisor_user_id" class="form-control-cskh padd-4" @click="toggleDropdown('myDropdown-sub-task-leader')" style="height: auto;">
                    <span style="margin-right: 20px;display: block;"> <span v-if="sub_task_detail.leader_position != '' && sub_task_detail.leader_position != null">[{{ sub_task_detail.leader_position }}]</span> {{update_sub_task_leader == null ? sub_task_detail.leader_last_name : update_sub_task_leader.last_name }}</span>
                    <img src="@/assets/images/book.svg" alt="">
                  </div>
                  <div id="myDropdown-sub-task-leader" class="dropdown-content-ocean">
                    <div class="position-relative div-search-ocean">
                      <input v-model="searchUserByLastName" type="text" class="input-search-ocean">
                    </div>
                    <div class="list-item-search-ocean">
                      <li v-for="user in fillterListUser"
                        @click="update_sub_task_leader = {id: user.id, position: user.position, last_name: user.last_name}, toggleDropdown('myDropdown-sub-task-leader'), updateSubTask()"
                        class="li-item-search">
                        <span v-if="user.position != '' && user.position != null">[{{ user.position }}]</span> {{ user.last_name }}
                      </li>
                    </div>
                  </div>
                </div>
                <div v-else class="content-detail-right btn-font-size display-flex cursor-pointer edit-bg-ocean-img" @click="UserStore.user.is_admin == '1' || UserStore.user.id == task.task_supervisor_user_id || UserStore.user.id == sub_task_detail.leader_user_id ? changeFieldUpdate('leader', 10) : ''">
                  <div class="detail-nv position-relative mar-l-10 mar-t-5">
                    <img :src="convertUrlAvatar(sub_task_detail.url_avatar)" alt="avatar" class="width-height-svg border-radius">
                    <span class="span-avatar-detail"> <span v-if="sub_task_detail.leader_position != '' && sub_task_detail.leader_position != null">[{{ sub_task_detail.leader_position }}]</span> {{ sub_task_detail.leader_last_name }}</span>
                  </div>
                </div>
              </div>

              <div class="one-row-cskh mar-t-10">
                <div class="title-detail width-40">
                  <span>Người thực hiện</span>
                </div>
                <div ref="input_list_employee" v-if="is_update_sub_task == 'list_employee'" class="content-cskh icon-content-cskh content-detail-right btn-font-size width-60">
                  <div id="task_supervisor_user_id" class="form-control-cskh padd-4 set-height-input-auto" @click="toggleDropdown('myDropdown-sub-task-emp')">
                    <div class="width-change-ocean">
                      <span v-for="emp in update_sub_task_list_employee" class="show-chan-multi"> 
                        <small v-if="emp.position != '' && emp.position != null">[{{ emp.position }}]</small>  {{ emp.last_name }}
                        <span @click.stop="removeEmpUpdateSubTask(emp.id)">&#x2715</span>
                      </span>
                    </div>
                    <img src="@/assets/images/book.svg" alt="">
                  </div>
                  <div id="myDropdown-sub-task-emp" class="dropdown-content-ocean" style="width: 220px;right:0;margin-top:3px;">
                    <div class="position-relative div-search-ocean">
                      <input v-model="searchUserByLastName" type="text" class="input-search-ocean">
                    </div>
                    <div class="list-item-search-ocean">
                      <li v-for="user in fillterListUser"
                        @click="update_sub_task_list_employee.push({id: user.id, position: user.position, last_name: user.last_name}), toggleDropdown('myDropdown-sub-task-emp')"
                        class="li-item-search">
                        <span v-if="user.position != '' && user.position != null">[{{ user.position }}]</span> {{ user.last_name }}
                      </li>
                    </div>
                  </div>
                </div>
                <div v-else class="content-detail-right btn-font-size cursor-pointer edit-bg-ocean-img" @click="UserStore.user.is_admin == '1' || UserStore.user.id == task.task_supervisor_user_id || UserStore.user.id == sub_task_detail.leader_user_id ? changeFieldUpdate('list_employee', 10) : ''">
                  <div v-for="emp in sub_task_detail.list_employee" class="detail-nv position-relative mar-t-5 mar-l-10">
                    <img :src="convertUrlAvatar(emp.url_avatar)" alt="avatar" class="width-height-svg border-radius">
                    <span class="span-avatar-detail width-cal-detail-sub-task"> <span v-if="emp.position != '' && emp.position != null">[{{ emp.position }}]</span> {{ emp.last_name }}</span>
                  </div>
                </div>
              </div>

              <div v-if="sub_task_detail.status == '6'" class="one-row-cskh row-datepicker mar-t-10">
                <div class="title-detail width-40">
                  <span>Bàn giao</span>
                </div>
                <div ref="input_handover" v-if="is_update_sub_task == 'assigned_sub_task_id'" class="content-detail-right btn-font-size display-flex">
                  <div class="detail-nv position-relative mar-t-10 display-flex width-100">
                    <select v-model="select_sub_task" id="select-sub-task-hand-over" class="form-control-cskh width-60">
                      <option v-for="subTask in list_sub_task_select(sub_task_detail.id)" :value="subTask.id">{{ subTask.sub_task_name }}</option>
                    </select>
                    <button
                      @click="handOverSubTask()"
                      class="btn btn-font-size btn-popup-set-success mar-l-15 btn-ban-giao">
                        Bàn giao
                    </button>
                  </div>
                </div>
                <div v-else @click="changeFieldUpdate('assigned_sub_task_id', 10)" class="content-detail-right btn-font-size display-flex">
                  <div v-if="select_sub_task == null" class="detail-nv position-relative mar-t-10">
                    <span>Chưa bàn giao</span>
                  </div>
                  <div v-else class="detail-nv position-relative mar-t-10">
                    <span>{{ task.sub_task_name }}</span>
                  </div>
                </div>
              </div>
              <ShortCreateSubTask
                v-if="sub_task_detail.status == '6'"
                :allUser="allUser"
                @createSubTaskAds="createSubTaskAds()"
                @getListSubTask="getListSubTask" 
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
  <!-- End Modal giai doan len ke hoach -->

  <!-- The Modal Show IMG -->
<div id="myModal-show-img" class="modal-show-img">
  <span class="close-show-img" @click="closeModalPopupImg()">&times;</span>
  <img class="modal-content-show-img" id="img01-show-img">
  <div id="caption-show-img"></div>
</div>
</template>

<script setup>
import HeaderTaskDetail from "./HeaderTaskDetail.vue"
import Chart from "./Chart.vue"
import CreateSubTask from "./CreateSubTask.vue"
import SubTaskComment from "./SubTaskComment.vue"
import ShortCreateSubTask from "./ShortCreateSubTask.vue"

import $ from 'jquery'
import datetime from 'jquery-datetimepicker'
import { computed, inject, onBeforeUnmount, onMounted, onUpdated, ref, watch } from "vue"
import service from "../services/service"
import { useRoute, useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import { differenceInDays, differenceInHours, parse } from 'date-fns'
import { userStore } from "../store/modules/userStore"
import helper from '@/services/helper'

const UserStore = userStore()
const route = useRoute()
const router = useRouter()
const Constant = inject("$constant")
const isLoading = inject('isLoading')

//get task info
const task = ref([])
const task_id = ref(route.params.task_id)
const getTaskInfo = async (task_id) => {
  let url = process.env.VUE_APP_BASE_URL_API + '/' + Constant.pathGetTaskInfo + '/' + task_id
  let headers = {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token')).token}`,
  }
  isLoading.value = true
  const response = await service.get(url, {}, headers)
  isLoading.value = false
  if (response.data.returnCode == "200") {
    if (response.data.data != null) {
      task.value = response.data.data
      update_task_priority_level.value = task.value.priority_level
      update_task_contract_start_date.value = task.value.contract_start_date
      update_task_contract_end_date.value = task.value.contract_end_date
      select_sub_task.value = task.value.assigned_sub_task_id
    } else {
      routerPush("PageNotFound")
    }
  }
}
getTaskInfo(task_id.value)

const sub_task_detail = ref([])
const getSubTaskInfo = async (sub_task_id) => {
  let url = process.env.VUE_APP_BASE_URL_API + '/' + Constant.pathGetSubTaskInfo + '/' + sub_task_id
  let headers = {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token')).token}`,
  }
  isLoading.value = true
  const response = await service.get(url, {}, headers)
  isLoading.value = false
  if (response.data.returnCode == "200") {
    if (response.data.data != null) {
      update_sub_task_name.value = response.data.data.sub_task_name
      update_sub_task_description.value = response.data.data.description
      update_sub_task_status.value = response.data.data.status
      update_sub_task_progress_completed.value = response.data.data.progress_completed
      update_sub_task_progress_target.value = response.data.data.progress_target
      update_sub_task_progress_type.value = response.data.data.progress_type
      update_sub_task_deadline.value = response.data.data.deadline_end_date
      update_sub_task_priority_level.value = response.data.data.priority_level
      update_sub_task_list_employee.value = Array.from(response.data.data.list_employee)
      sub_task_detail.value = response.data.data
      getFileSubTask()
      getListHistory(sub_task_id)
      return true;
    } else {
      routerPush("PageNotFound")
      return false;
    }
  }
}

//get list sub task
const list_sub_task = ref([])
const getListSubTask = async (task_id) => {
  let url = process.env.VUE_APP_BASE_URL_API + '/' + Constant.pathGetListSubTask + '/' + task_id
  let headers = {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token')).token}`,
  }
  isLoading.value = true
  const response = await service.get(url, {}, headers);
  isLoading.value = false
  if (response.data.returnCode == "200") {  
    list_sub_task.value = response.data.data
  }
}

const sortBy = ref("sub_task_name")
const sort = ref("ASC")
const list_sub_task_sort = computed(() => {
  let list_sub_task_sort = list_sub_task.value
  list_sub_task_sort = list_sub_task_sort.sort((a, b) => {
    if (a.type == "2" || b.type == "2") {}
    else {
      return sort.value == "ASC" ? a[sortBy.value].localeCompare(b[sortBy.value]) : b[sortBy.value].localeCompare(a[sortBy.value])
    }
  })
  return list_sub_task_sort
})
const select_sub_task = ref("")
const handOverSubTask = () => {
  is_update_task.value = "assigned_sub_task_id"
  is_update_sub_task.value = ""
  updateTask()
  getSubTaskInfo(sub_task_detail.value.id)
}

const list_sub_task_select = (sub_task_id) => {
  let list_sub_task_sort = list_sub_task.value
  list_sub_task_sort = list_sub_task_sort.filter(subTask => subTask.id != sub_task_id);

  return list_sub_task_sort
}

const toggleSort = () => {
  sort.value = sort.value == "ASC" ? "DESC" : "ASC"
}

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
const usersInTask = ref([])
const getUserInTask = async () => {
  let url = process.env.VUE_APP_BASE_URL_API + '/' + Constant.pathGetListUserInTask + '/' + task_id.value
  let headers = {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token')).token}`
  }
  isLoading.value = true
  const response = await service.get(url, {}, headers);
  isLoading.value = false
  if (response.data.returnCode == "200") {
    usersInTask.value = response.data.data
  }
}
getUserInTask()

const warningDeadline = (subTask) => {
  const targetDateTime = parse(subTask.deadline_end_date, 'yyyy-MM-dd HH:mm:ss', new Date());
  const hoursDifference = differenceInHours(targetDateTime, new Date())
  return hoursDifference
}

const createSubTaskAds = async () => {
  let url = process.env.VUE_APP_BASE_URL_API + '/' + Constant.pathCreateSubTaskAds
  let headers = {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token')).token}`,
  }
  let params = {
    task_id: task_id.value,
    sub_task_name: "Chạy Ads",
    leader_user_id: task.value.task_supervisor_user_id,
    type: 2
  }
  isLoading.value = true
  const response = await service.post(url, params, headers)
  isLoading.value = false
  if (response.status == 200) {
    if (response.data.returnCode == 200) {
      getListSubTask(task_id.value)
      Swal.fire('Thành Công', 'Tạo công việc chạy Ads thành công!', 'success')
    } else {
      Swal.fire('Thất bại', response.data.message, 'error');
    }
  }
}

//update status Task
const updateStatusTask = async (status) => {
  let url = process.env.VUE_APP_BASE_URL_API + '/' + Constant.pathUpdateTask
  let headers = {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token')).token}`,
  }
  let params = {
    id: task_id.value,
    status: status
  }
  isLoading.value = true
  const response = await service.put(url, params, headers)
  isLoading.value = false
  if (response.status == 200) {
    if (response.data.returnCode == 200) {
      getTaskInfo(task_id.value)
    } else {
      Swal.fire('Thất bại', 'Thao tác thất bại!', 'error');
    }
  }
}

const showModalDetailSubTask = async (sub_task_id) => {
  const checkExists = await getSubTaskInfo(sub_task_id)
  if (checkExists) {
    $("#createSubTaskModal-len-ke-hoach").modal().show()
  
    // JS tab
    $('#div-comment').addClass('btn-tab-active');
    $('#div-commentC').removeClass('display-none');
    $('#div-history').removeClass('btn-tab-active');
    $('#div-historyC').addClass('display-none');
  }
}

const toggleDropdown = (id) => {
  $("#" + id).toggle();
}
const searchUserByLastName = ref("")
const fillterListUser = computed(() => {
  let listUsers = allUser.value.filter(user =>
    user.last_name.includes(searchUserByLastName.value)
  )
  return listUsers
})

//update task
const is_update_task = ref("")
const update_task_supervisor = ref(null)
const update_task_priority_level = ref("")
const update_task_contract_start_date = ref("")
const update_task_contract_end_date = ref("")
const updateTask = async () => {
  let url = process.env.VUE_APP_BASE_URL_API + '/' + Constant.pathUpdateTask
  let headers = {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token')).token}`,
  }
  let params = {
    id: task_id.value
  }
  if (is_update_task.value == "task_supervisor") {
    params.task_supervisor_user_id = update_task_supervisor.value.id
  } else if (is_update_task.value == "priority_level") {
    params.priority_level = update_task_priority_level.value
  } else if (is_update_task.value == "deadline") {
    params.contract_start_date = update_task_contract_start_date.value
    params.contract_end_date = update_task_contract_end_date.value
  } else if (is_update_task.value == "assigned_sub_task_id") {
    params.assigned_sub_task_id_to = sub_task_detail.value.id
    params.assigned_sub_task_id_from = select_sub_task.value
  } 
  isLoading.value = true
  const response = await service.put(url, params, headers)
  isLoading.value = false
  is_update_task.value = ""
  if (response.status == 200) {
    if (response.data.returnCode == 200) {
      getTaskInfo(task_id.value)
    } else {
      Swal.fire('Thất bại', 'Thao tác thất bại!', 'error');
    }
  }
}

//update sub task
const is_update_sub_task = ref("")

const update_sub_task_name = ref("")
const update_sub_task_description = ref("")
const update_sub_task_status = ref("")
const update_sub_task_progress_completed = ref("")
const update_sub_task_progress_target = ref("")
const update_sub_task_progress_type = ref("")
const update_sub_task_deadline = ref("")
const update_sub_task_priority_level = ref("")
const update_sub_task_leader = ref(null)
const update_sub_task_list_employee = ref([])
const update_sub_task_files = ref([])
const uploadFileSubTask = (event) => {
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
        update_sub_task_files.value.push({file, src, file_name})
      });
      //Read the image
      picReader.readAsDataURL(file);
    }
    $("#file-sub-task").val(null)
    setTimeout(() => {
      is_update_sub_task.value = 'file_sub_task'
      updateSubTask()
    }, 10)
  } else {
    console.log("Your browser does not support File API");
  }
}
const removeSubTaskFile = async (event, file_id) => {
  let url = process.env.VUE_APP_BASE_URL_API + '/' + Constant.pathRemoveSubTaskFile
  let params = {
    id: file_id,
    sub_task_id: sub_task_detail.value.id
  }
  let headers = {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token')).token}`
  }
  let indexToDelete = sub_task_detail.value.file_attachments.findIndex(item => item.id == file_id)
  if (indexToDelete !== -1) {
    sub_task_detail.value.file_attachments.splice(indexToDelete, 1)
  }
  event.currentTarget.parentNode.remove()
  const response = await service.delete(url, params, headers)
  if (response.status == 200) {
    if (response.data.returnCode == "200") {
      getListHistory(sub_task_detail.value.id)
    }
  }
}
const sub_task_file_attachments = ref([])
const getFileSubTask = async () => {
  let url = process.env.VUE_APP_BASE_URL_API + '/' + Constant.pathGetListFileSubTask + '/' + sub_task_detail.value.id
  let headers = {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token')).token}`,
  }
  const response = await service.get(url, {}, headers)
  if (response.data.returnCode == "200") {
    sub_task_file_attachments.value = response.data.data
  }
}

const removeEmpUpdateSubTask = (id) => {
  let indexToDelete = update_sub_task_list_employee.value.findIndex(item => item.id == id)
  if (indexToDelete !== -1) {
    update_sub_task_list_employee.value.splice(indexToDelete, 1)
  }
}
onUpdated(() => {
  $('.datetimepicker').datetimepicker();
})

onMounted(() => {
  getListSubTask(task_id.value)
  document.addEventListener('click', handleClickOutside)
  if (route.params.sub_task_id) {
    showModalDetailSubTask(route.params.sub_task_id)
  }
  watch(() => route.params.key, (newValue, oldValue) => {
    if (route.name == "TaskDetail") {
      task_id.value = route.params.task_id
      getTaskInfo(task_id.value)
      getListSubTask(task_id.value)
      if (route.params.sub_task_id) {
       showModalDetailSubTask(route.params.sub_task_id)
      }
    }
  })
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
const input_sub_task_name = ref(null);
const input_status = ref(null);
const input_deadline = ref(null);
const input_priority_level = ref(null);
const input_leader = ref(null);
const input_description = ref(null);
const input_file = ref(null);
const input_progress_completed = ref(null);
const input_progress_target = ref(null);
const input_progress_type = ref(null);
const input_list_employee = ref(null);
const input_handover = ref(null);
const handleClickOutside = (event) => {
  if (is_update_sub_task.value == "sub_task_name") {
    if (input_sub_task_name.value && !input_sub_task_name.value.contains(event.target)) {
      if (update_sub_task_name.value == sub_task_detail.value.sub_task_name) {
        changeFieldUpdate("sub_task_name", 5)
      } else {
        updateSubTask()
      }
    }
  } else if (is_update_sub_task.value == "description") {
    if (input_description.value && !input_description.value.contains(event.target) && input_file.value && !input_file.value.contains(event.target)) {
      if (update_sub_task_description.value == sub_task_detail.value.description) {
        changeFieldUpdate("description", 5)
      } else {
        updateSubTask()
      }
    }
  } else if (is_update_sub_task.value == "progress") {
    if (input_progress_completed.value && input_progress_target.value && !input_progress_completed.value.contains(event.target) && !input_progress_target.value.contains(event.target)) {
      if (update_sub_task_progress_completed.value == sub_task_detail.value.progress_completed && update_sub_task_progress_target.value == sub_task_detail.value.progress_target) {
        changeFieldUpdate("progress", 5)
      } else {
        updateSubTask()
      }
    }
  } else if (is_update_sub_task.value == "progress_type") {
    if (input_progress_type.value && !input_progress_type.value.contains(event.target)) {
      if (update_sub_task_progress_type.value == sub_task_detail.value.progress_type) {
        changeFieldUpdate("progress_type", 5)
      } else {
        updateSubTask()
      }
    }
  } else if (is_update_sub_task.value == "deadline") {
    if (input_deadline.value && !input_deadline.value.contains(event.target)) {
      update_sub_task_deadline.value = $('input[name="update_deadline_end_date"]').val()
      if (update_sub_task_deadline.value == sub_task_detail.value.deadline_end_date) {
        changeFieldUpdate("deadline", 5)
      } else {
        updateSubTask()
      }
    }
  } else if (is_update_sub_task.value == "list_employee") {
    if (input_list_employee.value && !input_list_employee.value.contains(event.target)) {
      if (JSON.stringify(update_sub_task_list_employee.value) == JSON.stringify(sub_task_detail.value.list_employee)) {
        changeFieldUpdate("list_employee", 5)
      } else {
        updateSubTask()
      }
    }
  } else if (is_update_sub_task.value == "status") {
    if (input_status.value && !input_status.value.contains(event.target)) {
      changeFieldUpdate("status", 5)
    }
  } else if (is_update_sub_task.value == "deadline") {
    if (input_deadline.value && !input_deadline.value.contains(event.target)) {
      changeFieldUpdate("deadline", 5)
    }
  } else if (is_update_sub_task.value == "priority_level") {
    if (input_priority_level.value && !input_priority_level.value.contains(event.target)) {
      changeFieldUpdate("priority_level", 5)
    }
  } else if (is_update_sub_task.value == "leader") {
    if (input_leader.value && !input_leader.value.contains(event.target)) {
      changeFieldUpdate("leader", 5)
    }
  } else if (is_update_sub_task.value == "assigned_sub_task_id") {
    if (input_handover.value && !input_handover.value.contains(event.target)) {
      changeFieldUpdate("assigned_sub_task_id", 5)
    }
  }
}
const changeFieldUpdate = (fieldUpdate, time) => {
  setTimeout(() => {
    is_update_sub_task.value = is_update_sub_task.value == fieldUpdate ? '' : fieldUpdate
  }, time)
}
const updateSubTask = async () => {
  let url = process.env.VUE_APP_BASE_URL_API + '/' + Constant.pathUpdateSubTask
  let headers = {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token')).token}`,
    'content-type': 'multipart/form-data',
  }
  let params = {
    id: sub_task_detail.value.id
  }
  if (is_update_sub_task.value == "sub_task_name") {
    params.sub_task_name = update_sub_task_name.value
  } else if (is_update_sub_task.value == "description") {
    params.description = update_sub_task_description.value
  } else if (is_update_sub_task.value == "file_sub_task") {
    params.file_attachments = update_sub_task_files.value
  } else if (is_update_sub_task.value == "status") {
    params.status = update_sub_task_status.value
  } else if (is_update_sub_task.value == "progress") {
    params.progress_completed = update_sub_task_progress_completed.value
    params.progress_target = update_sub_task_progress_target.value
  } else if (is_update_sub_task.value == "progress_type") {
    params.progress_type = update_sub_task_progress_type.value
  } else if (is_update_sub_task.value == "deadline") {
    params.deadline_end_date = update_sub_task_deadline.value
  } else if (is_update_sub_task.value == "priority_level") {
    params.priority_level = update_sub_task_priority_level.value
  } else if (is_update_sub_task.value == "leader") {
    params.leader_user_id = update_sub_task_leader.value.id
  } else if (is_update_sub_task.value == "list_employee") {
    params.list_employee = update_sub_task_list_employee.value.length > 0 ? update_sub_task_list_employee.value : "delete_all"
  }
  is_update_sub_task.value = is_update_sub_task.value == "file_sub_task" ? "file_sub_task" : ""
  isLoading.value = true
  const response = await service.post(url, params, headers)
  isLoading.value = false
  if (response.status == 200) {
    if (response.data.returnCode == 200) {
      update_sub_task_files.value = []
      if (is_update_sub_task.value != "file_sub_task") {
        getSubTaskInfo(sub_task_detail.value.id)
        getListSubTask(task_id.value)
        getTaskInfo(task_id.value)
      } else {
        getFileSubTask()
        getListHistory(sub_task_detail.value.id)
        is_update_sub_task.value = "description"
      }
    } else {
      Swal.fire('Thất bại', 'Thao tác thất bại!', 'error');
    }
  }
}

const deleteSubTask = async (sub_task_id, sub_task_name) => {
  Swal.fire({
    title: 'Xóa công việc',
    text: `Bạn có chắc chắn muốn xóa công việc ${sub_task_name} ?`,
    icon: 'question',
    showCancelButton: true,
    showConfirmButton: true,  
    confirmButtonText: 'Xóa',
    cancelButtonColor: '#E0E0E0',
    cancelButtonText: 'Không xóa',
    customClass:  'my-confirm-header-task-detail'
  }).then(async (result) => {
    if (result.isConfirmed) {
      let url = process.env.VUE_APP_BASE_URL_API + '/' + Constant.pathDeleteSubTask
      let headers = {
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token')).token}`
      }
      let params = {
        id: sub_task_id
      }
      isLoading.value = true
      const response = await service.delete(url, params, headers)
      isLoading.value = false
      if (response.status == 200) {
        if (response.data.returnCode == 200) {
          $('#createSubTaskModal-len-ke-hoach .close').click()
          getListSubTask(task_id.value)
          getTaskInfo(task_id.value)
          Swal.fire('Thành công', `Xóa dự án công việc ${sub_task_name}!`, 'success')
        } else {
          Swal.fire('Thất bại', 'Thao tác thất bại!', 'error');
        }
      }
    }
  });
}
const routerPush = (name, params = {}) => {
  router.push({
    name,
    params
  })
}

const histories = ref([])
const getListHistory = async (sub_task_id) => {
  let url = process.env.VUE_APP_BASE_URL_API + '/' + Constant.pathGetListHistory + '/' + sub_task_id
  let headers = {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token')).token}`,
  }
  const response = await service.get(url, {}, headers)
  if (response.status == 200) {
    if (response.data.returnCode == "200") {
      histories.value = response.data.data
    }
  }
}

const time_change_noti_and_history = ref(process.env.VUE_APP_TIME_CHANGE_NOTI_AND_HISTORY)
const getHtmlHistory = (type, paramJson) => {
  var html = ""
  let params = JSON.parse(paramJson)
  if (params != null && params != undefined && params != "" && params.length > 0) {
    switch (type) {
      case "1":
        html = `<b>${params[0]}</b> đã bàn giao công việc <b>${params[1]}</b>`
        break;
      
      case "2":
      html = `<b>${params[0]}</b> đã xóa 1 <b>${params[1]}</b> khỏi công việc`
        break;
      
      case "3":
      html = `<b>${params[0]}</b> đã thêm ${params[1]} <b>${params[2]}</b> vào công việc`
        break;
      
      case "4":
      html = `<b>${params[0]}</b> đã thay đổi <b>${params[1]}</b> công việc thành <b>${params[2]}</b>`
        break;
      
      default:
        html = `[Không thể xác định loại lịch sử hoạt động]`
        break;
      }
  } else {
    html = `[Không thể xác định dữ liệu lịch sử hoạt động]`
  }
    return html
}

const showImgPopup = async (event, id) => {
  var modal = document.getElementById('myModal-show-img');
  var modalImg = document.getElementById("img01-show-img");
  modal.style.display = "block";
  modalImg.src = event.target.src;
  $(id).removeAttr("tabindex");
}

// Click ESC close
$(document).keyup(function(e) {
  if (e.key === "Escape") {
    var modal = document.getElementById('myModal-show-img');
    var modal_kh = document.getElementById('createSubTaskModal-len-ke-hoach');
    if (modal_kh.style.display == 'block') { 
      $('#createSubTaskModal-len-ke-hoach').attr("tabindex", '-1');
      modal.style.display = "none";
    }
  }
});

const closeModalPopupImg = () => {
  var modal = document.getElementById('myModal-show-img');
  modal.style.display = "none";
}

$(document).click(function(event) {
  if (!$(event.target).closest('#employee_user_id').length) {
    if ($('#myDropdown-nv-ocean-2').is(':visible')) {
      if (!$(event.target).closest('.input-search-ocean').length) { 
        $("#myDropdown-nv-ocean-2").toggle();
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
    if ($('#myDropdown-sub-task-leader').is(':visible')) {
      if (!$(event.target).closest('.input-search-ocean').length) {
        $("#myDropdown-sub-task-leader").toggle();
      }
    }
    if ($('#myDropdown-sub-task-emp').is(':visible')) {
      if (!$(event.target).closest('.input-search-ocean').length) {
        $("#myDropdown-sub-task-emp").toggle();
      }
    }
  }
});

$('.btn').click(function () {
  fileInput.click();
}).show();

const tabShowDetail = (event) => {
  $('#div-comment').removeClass('btn-tab-active');
  $('#div-history').removeClass('btn-tab-active');
  $('.div-tab').addClass('display-none')
  
  let id = '#' + event.target.id + 'C';
  $(id).removeClass('display-none');
  let id_btn = '#' + event.target.id;
  $(id_btn).addClass('btn-tab-active');
}

const convertUrlAvatar = (url) => {
  var url_avatar = ""
  if (url != "" && url != null && url != undefined) {
    url_avatar = helper.getPathImage(url)
  } else {
    url_avatar = require('@/assets/images/avatar/deafault-avatar.png')
  }
  return url_avatar
}

$(document).ready(function() {
  var x, i, j, l, ll, selElmnt, a, b, c;
  x = document.getElementsByClassName("custom-select-ocean");
  l = x.length;
  for (i = 0; i < l; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    ll = selElmnt.length;
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 1; j < ll; j++) {
      c = document.createElement("DIV");
      c.innerHTML = selElmnt.options[j].innerHTML;
      c.setAttribute("class", selElmnt.options[j].className);
      c.addEventListener("click", function(e) {
          var y, i, k, s, h, sl, yl;
          s = this.parentNode.parentNode.getElementsByTagName("select")[0];
          sl = s.length;
          h = this.parentNode.previousSibling;
          for (i = 0; i < sl; i++) {
            if (s.options[i].innerHTML == this.innerHTML) {
              s.selectedIndex = i;
              h.innerHTML = this.innerHTML;
              y = this.parentNode.getElementsByClassName("same-as-selected");
              yl = y.length;
              for (k = 0; k < yl; k++) {
                y[k].classList.remove("same-as-selected");
              }
              var class_text = this.className;
              class_text = class_text+ ' same-as-selected';
              this.setAttribute("class", class_text);
              break;
            }
          }
          h.click();
      });
      b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function(e) {
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
      });
  }
  function closeAllSelect(elmnt) {
    var x, y, i, xl, yl, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    xl = x.length;
    yl = y.length;
    for (i = 0; i < yl; i++) {
      if (elmnt == y[i]) {
        arrNo.push(i)
      } else {
        y[i].classList.remove("select-arrow-active");
      }
    }
    for (i = 0; i < xl; i++) {
      if (arrNo.indexOf(i)) {
        x[i].classList.add("select-hide");
      }
    }
  }
  document.addEventListener("click", closeAllSelect);
});

const getSubTaskDetailDescription = () => {
  var contentElement = document.getElementById('sub-task-detail-des');
  var text = sub_task_detail.value.description;
  if (contentElement && text) {
    var pattern = /(https?:\/\/\S+)/gi;
    var replacedText = text.replace(pattern, function (url) {
      return '<a href="' + url + '" target="_blank">' + url + '</a>';
    });
    contentElement.innerHTML = replacedText;
  } else {
    setTimeout(getSubTaskDetailDescription, 100);
  }
}
</script>

<style scoped></style>