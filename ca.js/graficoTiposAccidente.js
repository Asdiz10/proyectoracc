// graficoTiposAccidente.js
// Requiere D3 v7 cargado previamente en el HTML

// datos: array de objetos tipo
// { "TIPO_ACCIDENTE_SIMPLE": "Alcance", "TOTAL_VICTIMAS_24H": 17677, ... }

function crearGraficoTiposAccidente(containerSelector, datos, opciones = {}) {
  const container = d3.select(containerSelector);
  if (container.empty()) return;

  const {
    colorBarra = "#2563eb",
    colorBarraHover = "#3b82f6",
    colorFondo = "#020617",
    colorTexto = "#e5e7eb",
    colorGrid = "#1f2937",
    padding = { top: 32, right: 24, bottom: 68, left: 80 },
    titulo = "Víctimas por tipo de accidente",
  } = opciones;

  const processed = (datos || [])
    .map((d) => {
      if (!d) return null;
      if (d.tipo != null && d.victimas != null) {
        return { tipo: String(d.tipo), victimas: +d.victimas };
      }
      if (d.TIPO_ACCIDENTE_SIMPLE != null && d.TOTAL_VICTIMAS_24H != null) {
        return {
          tipo: d.TIPO_ACCIDENTE_SIMPLE,
          victimas: +d.TOTAL_VICTIMAS_24H,
        };
      }
      return null;
    })
    .filter(Boolean);

  if (!processed.length) {
    container.select("svg").remove();
    container.selectAll("div.__tooltip-tipos").remove();
    container
      .append("div")
      .attr("class", "__tooltip-tipos no-data")
      .style("position", "absolute")
      .style("color", "#f9fafb")
      .style("padding", "0.5rem")
      .style("background", "rgba(0,0,0,0.6)")
      .style("border-radius", "6px")
      .text("No hay datos para este año");
    return;
  }

  // limpiar gráfico anterior
  container.select("svg").remove();
  container.selectAll("div.__tooltip-tipos").remove();

  const width = container.node().clientWidth || 800;
  const height = container.node().clientHeight || 420;

  const svg = container
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .style("width", "100%")
    .style("height", "100%")
    .style("background", colorFondo);

  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;

  const g = svg
    .append("g")
    .attr("transform", `translate(${padding.left},${padding.top})`);

  const x = d3
    .scaleBand()
    .domain(processed.map((d) => d.tipo))
    .range([0, innerWidth])
    .padding(0.25);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(processed, (d) => d.victimas) * 1.1])
    .nice()
    .range([innerHeight, 0]);

  // rejilla
  g.append("g")
    .attr("class", "grid")
    .call(d3.axisLeft(y).tickSize(-innerWidth).tickFormat(""))
    .selectAll("line")
    .attr("stroke", colorGrid)
    .attr("stroke-opacity", 0.4);

  // ejes
  g.append("g")
    .attr("transform", `translate(0,${innerHeight})`)
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("fill", colorTexto)
    .attr("font-size", 10)
    .attr("transform", "rotate(-30)")
    .attr("text-anchor", "end");

  g.append("g")
    .call(d3.axisLeft(y).ticks(5).tickFormat(d3.format(".2s")))
    .selectAll("text")
    .attr("fill", colorTexto);

  g.selectAll(".domain, .tick line").attr("stroke", "#4b5563");

  const tooltip = container
    .append("div")
    .attr("class", "__tooltip-tipos")
    .style("position", "absolute")
    .style("pointer-events", "none")
    .style("background", "#020617")
    .style("color", "#f9fafb")
    .style("padding", "0.4rem 0.6rem")
    .style("font-size", "0.75rem")
    .style("border-radius", "0.5rem")
    .style("border", "1px solid rgba(55,65,81,0.8)")
    .style("box-shadow", "0 18px 35px rgba(15,23,42,0.9)")
    .style("opacity", 0)
    .style("transform", "translate(-50%, -130%)")
    .style("z-index", 20);

  function handleMouseOver(event, d) {
    d3.select(this).attr("fill", colorBarraHover).attr("opacity", 1);

    tooltip
      .style("opacity", 1)
      .html(
        `<strong>${d.tipo}</strong><br/>Víctimas: <strong>${d3.format(",")(d.victimas)}</strong>`,
      );

    tooltip
      .style("left", `${event.pageX + 10}px`)
      .style("top", `${event.pageY - 10}px`);
  }

  function handleMouseMove(event) {
    tooltip
      .style("left", `${event.pageX + 10}px`)
      .style("top", `${event.pageY - 10}px`);
  }

  function handleMouseOut() {
    d3.select(this).attr("fill", colorBarra).attr("opacity", 0.9);
    tooltip.style("opacity", 0);
  }

  g.selectAll("rect")
    .data(processed)
    .join("rect")
    .attr("x", (d) => x(d.tipo))
    .attr("y", (d) => y(d.victimas))
    .attr("width", x.bandwidth())
    .attr("height", (d) => innerHeight - y(d.victimas))
    .attr("rx", 6)
    .attr("fill", colorBarra)
    .attr("opacity", 0.9)
    .on("mouseenter", handleMouseOver)
    .on("mousemove", handleMouseMove)
    .on("mouseleave", handleMouseOut);

  g.selectAll("text.bar-label")
    .data(processed)
    .join("text")
    .attr("class", "bar-label")
    .attr("x", (d) => x(d.tipo) + x.bandwidth() / 2)
    .attr("y", (d) => y(d.victimas) - 6)
    .attr("text-anchor", "middle")
    .attr("fill", colorTexto)
    .attr("font-size", "10px")
    .text((d) => d3.format(",")(d.victimas));

  svg
    .append("text")
    .attr("x", padding.left)
    .attr("y", padding.top * 0.9)
    .attr("fill", colorTexto)
    .attr("font-size", 18)
    .attr("font-weight", "600")
    .attr(
      "font-family",
      "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    )
    .text(titulo);
}

if (typeof window !== "undefined") {
  window.crearGraficoTiposAccidente = crearGraficoTiposAccidente;
}
