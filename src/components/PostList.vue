<template>
  <div class="box">
    <div class="content">
      <h3>{{post.title}}</h3>
      <p>{{post.description}}</p>
    </div>

    <div class="level">
      <!-- Left side -->
      <div class="level-left">
        <div class="level-item">
          <span>{{getDate(post.updateAt)}}</span>
        </div>
      </div>

      <!-- Right side -->
      <div class="level-right" v-if="role === 'reader'">
        <div class="level-item">
          <a class="button" @click="$emit('clap-post', post)">
            <span class="icon is-small">
              <i class="mdi mdi-heart"></i>
            </span>
            <span>{{post.claps}}</span>
          </a>
        </div>
      </div>
      <div class="level-right" v-if="role === 'writer'">
        <div class="level-item">
          <a class="button" @click="$emit('edit-post', post)">
            <span class="icon is-small">
              <i class="mdi mdi-square-edit-outline"></i>
            </span>
            <span>Изменить</span>
          </a>
        </div>
        <div class="level-item">
          <a class="button" @click="$emit('delete-post', post.id)">
            <span class="icon is-small">
              <i class="mdi mdi-delete"></i>
            </span>
            <span>Удалить</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dateDiff from "@/plugins/dateDiff";

export default {
  name: "Posts",
  props: {
    post: {
      type: Object,
      required: true,
    },
    role: {
      type: String,
      default: "guest",
    },
  },
  methods: {
    getDate(string) {
      function declOfNum(n, titles) {
        return titles[
          n % 10 === 1 && n % 100 !== 11
            ? 0
            : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)
            ? 1
            : 2
        ];
      }

      const currentDate = new Date();
      const postDate = new Date(string);

      const years = dateDiff.inYears(postDate, currentDate);
      if (years)
        return `${years} ${declOfNum(years, ["год", "года", "лет"])} назад`;

      const months = dateDiff.inMonths(postDate, currentDate);

      if (months)
        return `${months} ${declOfNum(months, [
          "месяц",
          "месяца",
          "месяцев",
        ])} назад`;

      const days = dateDiff.inDays(postDate, currentDate);
      if (days)
        return `${days} ${declOfNum(days, ["день", "дня", "дней"])} назад`;

      const seconds = Math.floor(
        (currentDate.getTime() - postDate.getTime()) / 1000
      );
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      if (hours > 0)
        return `${hours} ${declOfNum(hours, ["час", "часа", "часов"])} назад`;

      if (minutes > 0)
        return `${minutes} ${declOfNum(minutes, [
          "минута",
          "минуты",
          "минут",
        ])} назад`;

      return "минуту назад";
    },
  },
};
</script>
