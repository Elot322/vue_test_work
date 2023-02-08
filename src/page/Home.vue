<template>
    <div>
        <div class="title">
            <h1>СПИСОК ПОЛЬЗОВАТЕЛЕЙ</h1>
            <h2>JSONPLACEHOLDER</h2>
        </div>
        <div class="user-list-wrapper">
            <UserList
                :user-list="userList"
                :limit="limit"
            ></UserList>
        </div>
    </div>
</template>

<script lang="ts">
import UserList from '@/components/UserList.vue';
import { UserEntity } from '@/domain/types';
import Vue from 'vue';
import UserRepository from "../../src/domain/repository"

interface IData {
    userList: Array<UserEntity>,
    limit: number
}

export default Vue.extend<IData, {}, {}>({
    components: { UserList },
    data() {
        return {
            userList: [],
            limit: 5
        };
    },
    //Перед монтированием получаем данные с плейсхолдера
    async beforeMount(){
        this.userList = await UserRepository.getUsers();
    }

}) 
</script>

<style>
    .title {
        text-align: center;
    }
    .user-list-wrapper {
        text-align: center;
    }
</style>