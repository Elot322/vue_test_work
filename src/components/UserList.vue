<template>
  <div>
    <ul>
      <li v-for="user in limitedUserList">ID: {{ user.id }}, Имя: {{ user.name }}, Телефон: {{ user.phone }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import  { UserEntity }  from '@/domain/types';
import { computed, defineComponent, PropType } from 'vue';

export default defineComponent({
  name: "UserList",
  
  props: {
    userList: {
      //Я НЕ ЗНАЮ КАК ТУТ ПРАВИЛЬНО СДЕЛАТЬ, TS ругается.
      type: [] as PropType<Array<UserEntity>>,
      default: [{id: 0, name: "ERROR", phone: "ERROR"}]
    },
    limit: {
      type: Number,
      default: 0
    },
    showAll: {
      type: Boolean,
      default: false,
    }
  },

  setup(props) {
    const limitedUserList = computed<Array<UserEntity>>({
      get(): Array<UserEntity> {
        if(props.showAll === false) {
          return props.userList.slice(0, props.limit)
        } else {
          return props.userList
        }
      },
      set(newValue: Array<UserEntity>): void {
      }
    });

    
    return {
      limitedUserList,
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