<template>
  <div class ="user-list">
    <div class="user-list-body">
      <ul>
        <li v-for="user in limitedUserList">ID: {{ user.id }}, Имя: {{ user.name }}, Телефон: {{ user.phone }}</li>
      </ul>
    </div>
    <div class="user-list-actions">
      <div class="actions" v-show="showButton">
            <button @click="onButtonClick">{{buttonText}}</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import  { UserEntity }  from '@/domain/types';
import { computed, defineComponent, PropType, ref } from 'vue';

export default defineComponent({
  name: "UserList",
   props: {
    userList: {
      type: Array as PropType<UserEntity[]>,
      default:() => [{id: 0, name: "ERROR", phone: "ERROR"}]
    },
    limit: {
      type: Number,
      default: 0
    },
  },
  setup(props) {
    //Переменные и функция не передающиеся на template
    const isShowedAll = ref<boolean>(false);
    function openFullList(): void {
      isShowedAll.value = !isShowedAll.value
    } 

    //Сomputed
    const limitedUserList = computed<UserEntity[]>(()=> isShowedAll.value ? props.userList : props.userList.slice(0, props.limit));
    const buttonText = computed<string>(()=> isShowedAll.value ? "Скрыть" : "Далее");
    const showButton = computed<boolean>(()=> props.userList.length > props.limit ? true : false)
    
    //Methods
    function onButtonClick(): void {
      openFullList();
    }

    return {
      limitedUserList,
      buttonText,
      showButton,
      onButtonClick,
    }
  }
})
</script>

<style>
  li {
    list-style-type: none; 
   }
   ul {
    margin-left: 0; 
    padding-left: 0; 
   }
</style>