<template>
    <div>
        <div class="title">
            <h1>СПИСОК ПОЛЬЗОВАТЕЛЕЙ</h1>
            <h2>JSONPLACEHOLDER</h2>
        </div>
        <div class="user-list-wrapper">
            <UserList
                :show-all="showAll"
                :user-list="userList"
                :limit="limit"
            ></UserList>
        </div>
        <div class="actions" v-show="userList.length > limit">
            <button @click="onButtonClick">{{buttonText}}</button>
        </div>
    </div>
</template>

<script lang="ts">
import UserList from '@/components/UserList.vue';
import { UserEntity } from '@/domain/types';
import Vue from 'vue';
import UserRepository from "../../src/domain/repository"

interface IData {
    showAll: boolean,
    userList: Array<UserEntity>,
    limit: number
}

interface IMethods {
    onButtonClick(): void;
    openFullList(): void;
}

interface IComputed {
    buttonText: string;
}

export default Vue.extend<IData, IMethods, IComputed>({
    components: { UserList },

    data() {
        return {
            showAll: false,
            userList: [],
            limit: 5
        };
    },

    computed: {
        //Текст кнопки
        buttonText(): string {
           return this.showAll ? "Скрыть" : "Далее" 
        }
    },

    methods: {
        //Обработчик нажатия на кнопку
        onButtonClick(): void {
            this.openFullList();
        },
        //Метод раскрывающий полный лист
        openFullList(): void {
            this.showAll = !this.showAll;
        },
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
    .actions {
        text-align: center;
    }
    .user-list-wrapper {
        text-align: center;
    }
</style>