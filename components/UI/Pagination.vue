<script setup>
const props = defineProps({
  currentPage: 1,
  totalPages: 1
})
const emit = defineEmits(['new-page'])
// const { isMobile } = useDevice()

const pageNumbers = computed(() => {
  const maxVisiblePages = 5; // Maximum number of visible pages
  const range = [];
  const totalPagesValue = props.totalPages;

  // Calculate the range of visible pages
  const startPage = Math.max(1, Math.min(props.currentPage - Math.floor(maxVisiblePages / 2), totalPagesValue - maxVisiblePages + 1));
  const endPage = Math.min(startPage + maxVisiblePages - 1, totalPagesValue);

  // Fill the range array with visible pages
  for (let i = startPage; i <= endPage; i++) {
    range.push(i);
  }

  return range;
});

const changePage = (pageNumber) => {
  if (pageNumber === '...')
    return
  emit('new-page', pageNumber)
};
</script>

<template>
  <nav aria-label="Pagination">
    <div class="pagination">
      <button
          :disabled="props.currentPage === 1"
          @click="changePage(1)"
          aria-label="First"
          class="pagination-btn text-xl-d"
      >
        <span aria-hidden="true">&laquo;</span>
      </button>

      <button
          :disabled="props.currentPage === 1"
          @click="changePage(props.currentPage - 1)"
          aria-label="Previous"
          class="pagination-btn text-xl-d"
      >
        <span aria-hidden="true">&lsaquo;</span>
      </button>

      <button
          v-for="pageNumber in pageNumbers"
          :key="pageNumber"
          :class="{ active: pageNumber === props.currentPage }"
          class="pagination-btn"
          @click="changePage(pageNumber)"
      >
        <span>{{ pageNumber }}</span>
      </button>

      <button
          :disabled="props.currentPage === props.totalPages"
          @click="changePage(props.currentPage + 1)"
          aria-label="Next"
          class="pagination-btn text-xl-d"
      >
        <span aria-hidden="true">&rsaquo;</span>
      </button>

      <button
          :disabled="props.currentPage === props.totalPages"
          @click="changePage(props.totalPages)"
          aria-label="Last"
          class="pagination-btn text-xl-d"
      >
        <span aria-hidden="true">&raquo;</span>
      </button>
    </div>
  </nav>
</template>