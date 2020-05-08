<template>
  <div class="activity">
    <div class="post" v-for="item in data" :key="item.id">
      <div class="user">
        <img :src="item.avatar" class="avatar-circle">
        <span class="username">{{item.name}}</span>
        <span class="describe">{{item.describe}}</span>
      </div>
      <p>{{item.comment}}</p>
      <ul class="operator">
        <li>
          <span>
            <i class='el-icon-share' />
            分享
          </span>
        </li>
        <li>
          <span>
            <i class='el-icon-star-off' />
            喜欢
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
const avatarPrefix = '?imageView2/1/w/80/h/80'

export default {
  name: "Activity",
  data() {
    return {
      data: [
        {
          id: 1,
          avatar: 'https://wpimg.wallstcn.com/57ed425a-c71e-4201-9428-68760c0537c4.jpg' + avatarPrefix,
          name: 'lron Man',
          describe: 'Shared publicly - 7:30 PM today',
          comment: 'Lorem ipsum represents a long-held tradition for designers,' +
          ' typographers and the like. Some people hate it and argue for its demise,' +
          'but others ignore the hate as they create awesome tools to help create filler' +
          'text for everyone from bacon lovers to Charlie Sheen fans.' +
          'Lorem ipsum represents a long-held tradition for designers,' +
          'typographers and the like. Some people hate it and argue for' +
          'tools to help create filler text for everyone from bacon lovers'
        },
        {
          id: 2,
          avatar: 'https://wpimg.wallstcn.com/9e2a5d0a-bd5b-457f-ac8e-86554616c87b.jpg' + avatarPrefix,
          name: 'Captain American',
          describe: 'Sent you a message - yesterday',
          comment: 'Lorem ipsum represents a long-held tradition for designers,' +
          ' typographers and the like. Some people hate it and argue for its demise,' +
          'but others ignore the hate as they create awesome tools to help create filler' +
          'text for everyone from bacon lovers to Charlie Sheen fans.',
        },
        {
          id: 3,
          avatar: 'https://wpimg.wallstcn.com/fb57f689-e1ab-443c-af12-8d4066e202e2.jpg' + avatarPrefix,
          name: 'Spider Man',
          describe: 'Posted 4 photos - 2 days ago',
          comment: 'Lorem ipsum represents a long-held tradition for designers,' +
          ' typographers and the like. Some people hate it and argue for its demise,' +
          'but others ignore the hate as they create awesome tools to help create filler' +
          'text for everyone from bacon lovers to Charlie Sheen fans.',
        },
      ],
      avatarPrefix,
    };
  },
  methods: {
    //
  }
};
</script>

<style lang="scss" scoped>
.post {
  font-size: 14px;
  border-bottom: 1px solid #d2d6de;
  margin-bottom: 10px;
  padding-bottom: 10px;
  color: #666;

  .user {
    .avatar-circle {
      border-radius: 100%;
      width: 40px;
      height: 40px;
      float: left;
    }

    .username {
      display: block;
      font-size: 16px;
      color: #000;
      margin-left: 50px;
      padding: 2px 0;
    }

    .describe {
      display: block;
      margin-left: 50px;
      padding: 2px 0;
    }
  }

  .operator {
    margin: 0;
    padding: 0;
    list-style: none;

    li {
      display: inline-block;
      vertical-align: middle;
      padding: 0 5px;
      font-size: 13px;
    }
  }
}
</style>
