<template>
  <div>
    <ul>
      <li v-for="user in limitedUserList">ID: {{ user.id }}, Имя: {{ user.name }}, Телефон: {{ user.phone }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import  { UserEntity }  from '@/domain/entity';
import { computed, defineComponent, PropType } from 'vue';

export default defineComponent({
  name: "UserList",
  props: {
    userList: {
      //Я НЕ ЗНАЮ КАК ТУТ ПРАВИЛЬНО СДЕЛАТЬ
      type: [] as PropType<Array<UserEntity>>,
      default: [{id: 0, name: "default", phone: "22222"}]
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
          console.log("Limited")
          return props.userList.slice(0, props.limit)
        } else {
          console.log("No limited")
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
    list-style-type: none; /* Убираем маркеры */
   }
   ul {
    margin-left: 0; /* Отступ слева в браузере IE и Opera */
    padding-left: 0; /* Отступ слева в браузере Firefox, Safari, Chrome */
   }
</style>