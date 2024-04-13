<script setup="ts">
import {type Database} from '~/types/database_types';
const supabase = useSupabaseClient<Database>();

const {data: profiles} = await useAsyncData(async () => {
    const {data} = await supabase.from('profiles').select('*');
    return data;
});

const profile = reactive({
    name: '',
    price: 0
})

const addProduct = async() => {
    const {error} = await supabase.from('profiles').insert(profile);
    if(error){
        alert(error.message);
    }else{
        return true;
    }
};

</script>

<template>
    <div>
        <h1>
            profiles
        </h1>
        <ul v-if="profiles && profiles.length">
            <li v-for="profile in profiles" :key="profile.id">
                {{ profile.username }} - {{ profile.id }}
            </li>
        </ul>

        <p v-else>failed to load</p>

        <form @submit.prevent="addProfile">
            <input type="text" placeholder="Name" v-model="profile.name">
            <input type="number" placeholder="Price" v-model="profile.price">
            <button type="submit">
                Add profile
            </button>
        </form>
    </div>
</template>
