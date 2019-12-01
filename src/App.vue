<template>
  <div>
    <el-table
      :data="stuData"
      style="width: 100%"
    >
      <el-table-column
        prop="name"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="clazz"
        label="班级"
        width="180">
      </el-table-column>
      <el-table-column
        prop="description"
        label="描述"
        width="180">
      </el-table-column>
      <el-table-column
        prop="id"
        label="主键">
      </el-table-column>
      
      <el-table-column
        prop="id_card"
        label="身份证号">
      </el-table-column>
    </el-table>
    <el-card>
      <el-input v-model="name" class='input-item' placeholder="请输入姓名" />
      <el-input v-model="clazz" class='input-item' placeholder="请输入班级" />
      <el-input v-model="description" class='input-item' placeholder="请输入描述" />
      <el-input v-model="id_card" class='input-item' placeholder="请输入身份证号" />
      <el-button @click="handleSubmitProfile()" type="primary">提交</el-button>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'app',
  data() {
    return {
      stuData: [],
      name: '',
      id_card: '',
      clazz: '',
      description: ''
    }
  },
  methods: {
    getStuData() {
      const that = this;
      axios
        .get('/api/students')
        .then(res => {
          // eslint-disable-next-line
          console.log(res)
          that.stuData = res.data.data;
        })
        .catch(err => {
          throw new Error(err)
        });
    },
    handleSubmitProfile() {
      const { name, id_card, clazz, description } = this.$data;
      const that = this;
      axios
        .post('/api/students/append', {
          name,
          id_card,
          clazz,
          description
        })
        .then(res => {
          // eslint-disable-next-line
          console.log(res);
          that.clearInputBars();
          that.getStuData();
          window.alert(res.data.message);
        })
        .catch(err => {
          throw new Error(err);
        })

    },
    clearInputBars() {
      this.name = '';
      this.id_card = '';
      this.clazz = '';
      this.description = '';
    }
  },
  mounted() {
    this.getStuData();
  }
}
</script>

<style>
.input-item {
  margin-bottom: 10px;
}
</style>
