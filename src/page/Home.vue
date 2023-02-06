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
import { UserEntity } from '@/domain/entity';
import Vue from 'vue';
import UserRepository from "../../src/domain/repository"

interface IData {
    showAll: boolean,
    buttonText: String,
    userList: Array<UserEntity>,
    limit: number
}

interface IMethods {
    onButtonClick(): void;
}

interface IComputed {
}

export default Vue.extend<IData, IMethods, IComputed>({
    components: { UserList },
    data() {
        return {
            showAll: false,
            buttonText: "Далее",
            userList: [],
            limit: 5
        };
    },
    methods: {
        onButtonClick() {
            this.showAll = !this.showAll;
            if(this.showAll) {
                this.buttonText="Скрыть"
            } else {
                this.buttonText="Далее"
            }
        }
    },
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