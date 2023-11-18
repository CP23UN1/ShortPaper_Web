import { toRefs, ref, reactive } from 'vue'

export function useFetch(url, options) {
  const data = ref(null)
  const state = reactive({
    error: null,
    loading: false,
  })

  const fetchData = async () => {
    state.loading = true
    try {
      const res = await fetch(url, options)
      data.value = await res.json()
    } catch (e) {
      state.error = e
    } finally {
      state.loading = false
    }
  }

  fetchData()

  return { data, ...toRefs(state) }
}

// export function create(){
//   const requestOption = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({title: 'createProduct'})
//   };
//   fetch(`${import.meta.env.VITE_SERVER_URL}/product`, requestOption)
//   .then(response => response.json())
//   .then(data => this.productId = data.id)
// }