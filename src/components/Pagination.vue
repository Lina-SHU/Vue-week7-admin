<template>
  <div class="d-flex justify-content-end">
    <nav aria-label="Page navigation">
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: !pages.has_pre}"><a class="page-link" href="#" @click.prevent="$emit('getList', pages.current_page-1)">上一頁</a></li>
        <li class="page-item" v-for="page in pages.total_pages" :key="page" :class="{ active: pages.current_page === page }">
          <a class="page-link" href="#" @click.prevent="$emit('getList', page)">{{ page }}</a>
        </li>
        <li class="page-item" :class="{ disabled: !pages.has_next}" ><a class="page-link" href="#" @click.prevent="$emit('getList', pages.current_page+1)">下一頁</a></li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props: ['pages']
}
</script>
