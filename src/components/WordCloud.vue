<template>
  <div ref="cloudContainer" class="word-cloud"></div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import cloud from 'd3-cloud'
import * as d3 from 'd3'

const props = defineProps({
  words: {
    type: Array,
    required: true,
    default: () => []
  }
})

const cloudContainer = ref(null)

const renderCloud = (tags) => {
  const width = 400
  const height = 400
   
  const layout = cloud()
    .size([width, height])
    .words(
      tags.map(d => ({
        text: d.text,
        size: d.size || 10 + Math.random() * 30
      }))
    )
    .padding(()=>3)
    .rotate(() => 0)
    .font('Impact')
    .fontSize(d => d.size)
    .on('end', draw)

  layout.start()

  function draw(words) {
    d3.select(cloudContainer.value).html('') // limpar

    d3.select(cloudContainer.value)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`)
      .selectAll('text')
      .data(words)
      .enter().append('text')
      .style('font-size', d => `${d.size}px`)
      .style('font-family', 'Impact')
      .style('fill', () => d3.schemeCategory10[Math.floor(Math.random() * 10)])
      .attr('text-anchor', 'middle')
      .attr('transform', d => `translate(${d.x},${d.y})rotate(${d.rotate})`)
      .text(d => d.text)
  }
}

// Função que busca as tags do backend
const buscarTagsPopulares = async () => {
  const response = await fetch('https://dermasync-api-503074264980.us-central1.run.app/obter-tags-populares', {
    method: 'POST'
  })
  const data = await response.json()
  return Object.values(data.tags_populares)
}

onMounted(async ()=>{
    let tags_populares = await buscarTagsPopulares();

       let maxFrequencia = Math.max(...tags_populares.map(d => d.frequencia))
       renderCloud(tags_populares.map( d=> ({text:d.tag, size:14 + (d.frequencia / maxFrequencia) * 36})  ))}
    )
watch(() => props.words, renderCloud, { deep: true })
</script>

<style scoped>
.word-cloud {
  width: 100%;
  height: auto;
}
</style>
