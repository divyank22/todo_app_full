<template>
  <form v-if="!loading" @submit.prevent="submitfrom()">
    <div>
      <label for="name">name</label>
      <input placeholder="enter a name" v-model="name" type="text">
    </div>
    <div v-if="error" style="color: red;">
      <span>{{ error }}</span>
    </div>
    <div v-if="message" style="color: red;">
      <span>{{ message}}</span>
    </div>
    <label class="formlabel" for="email">Email</label>
    <br>
    <input id="email" v-model="email" type="email" placeholder="Enter your email" required />
    <div>
      <label class="formlabel" for="password">Password</label>
      <br>
      <input id="password" v-model="password" :type="showPassword ? 'text' : 'password'"
        placeholder="Enter your password" required />
      <label>
        <button type="button" @click="showPassword = !showPassword">
          {{ showPassword ? "Hide" : "Show" }} Password
        </button>
      </label>
    </div>
    <div>
      <label class="formlabel" for="age">Age</label>
      <br>
      <input id="age" v-model="age" type="number" placeholder="Enter your age" required />
    </div>
    <button type="submit" :disabled="disableButton">{{ loading ? 'Submitting...' : 'Submit' }}</button>
  </form>
  <form v-else @submit.prevent="verifyOTPAndRegister()">
    <div>
      <label class="formlabel" for="otp">otp</label>
      <br>
      <input id="otp" v-model="otp" type="text" placeholder="Enter your otp" required />
    </div>
    <button type="submit" >Submit </button>
  </form>
</template>
<script setup>
import { ref } from 'vue';
import axios from 'axios';
import router from '../route';
const showPassword = ref(false)
const loading = ref(false)
const name = ref("")
const email = ref("")
const age = ref(0)
const password = ref("")
const otp = ref("")
const otpSent = ref(false);
const message=ref("")
const successMessage = ref("")
const error = ref('');
const submitfrom = async () => {
  successMessage.value = "";
  error.value = "";
  const userfrom = {
    name: name.value,
    email: email.value,
    age: age.value,
    password: password.value,
    otp: otp.value,
    message:message.value
  }
  if (!name.value || !email.value || !password.value || !age.value) {
    error.value = 'All fields are required!';
    return;
  }
  try {
    const response = await axios.post('/api/otp/send-otp', { email: email.value });
    loading.value=true
    successMessage.value = 'OTP sent to your email. Please enter it to complete registration.';
    otpSent.value = true;
  } catch (err) {
    console.log(err)
  }
}
const verifyOTPAndRegister = async () => {
  error.value = '';
  successMessage.value = '';
  const response = await axios.post('/api/login/signup', {
    name: name.value,
    email: email.value,
    age: age.value,
    password: password.value,
    otp: otp.value,
    message:message.value
  })
  successMessage.value = 'Registration successful!';
  console.log('Response:', response.data);
  router.push({ path: 'home' })
}
</script>