// graficoMuertesLinea.js
// Requiere D3 v7 cargado en el HTML

function crearGraficoMuertesLinea(containerSelector, datos, opciones = {}) {
  const container = d3.select(containerSelector);
  if (container.empty()) return;

  const años = Object.keys(datos).map(Number).sort((a, b) => a - b);
  const valores = años.map(a => ({ año: a, muertes: +datos[a] }));

  const {
    colorLinea = "#2563eb",
    colorPunto = "#1d4ed8",
    colorFondo = "#0b1120",
    colorTexto = "#e5e7eb",
    colorGrid = "#1f2937",
    padding = { top: 40, right: 32, bottom: 48, left: 56 },
    titulo = "Muertes totales por año",
    añoMin = d3.min(años),
    añoMax = d3.max(años)
  } = opciones;

  const filtered = valores.filter(d => d.año >= añoMin && d.año <= añoMax);

  container.select("svg").remove();

  const width = container.node().clientWidth || 800;
  const height = container.node().clientHeight || 400;

  const svg = container
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .style("width", "100%")
    .style("height", "100%")
    .style("background", colorFondo);

  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;

  const g = svg.append("g").attr("transform", `translate(${padding.left},${padding.top})`);

  const x = d3
    .scalePoint()
    .domain(filtered.map(d => d.año))
    .range([0, innerWidth])
    .padding(0.5);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(filtered, d => d.muertes) * 1.05])
    .nice()
    .range([innerHeight, 0]);

  g.append("g")
    .attr("class", "grid")
    .attr("transform", `translate(0,${innerHeight})`)
    .call(d3.axisBottom(x).tickSize(-innerHeight).tickFormat(""))
    .selectAll("line")
    .attr("stroke", colorGrid)
    .attr("stroke-opacity", 0.3);

  g.append("g")
    .attr("class", "grid")
    .call(d3.axisLeft(y).tickSize(-innerWidth).tickFormat(""))
    .selectAll("line")
    .attr("stroke", colorGrid)
    .attr("stroke-opacity", 0.3);

  g.append("g")
    .attr("transform", `translate(0,${innerHeight})`)
    .call(d3.axisBottom(x).tickFormat(d3.format("d")))
    .selectAll("text")
    .attr("fill", colorTexto);

  g.append("g")
    .call(d3.axisLeft(y).ticks(5))
    .selectAll("text")
    .attr("fill", colorTexto);

  g.selectAll(".domain, .tick line").attr("stroke", "#4b5563");

  const line = d3
    .line()
    .x(d => x(d.año))
    .y(d => y(d.muertes))
    .curve(d3.curveMonotoneX);

  g.append("path")
    .datum(filtered)
    .attr("fill", "none")
    .attr("stroke", colorLinea)
    .attr("stroke-width", 3)
    .attr("d", line);

  const focusGroup = g.append("g").style("display", "none");

  const focusCircle = focusGroup
    .append("circle")
    .attr("r", 6)
    .attr("fill", colorPunto)
    .attr("stroke", "#ffffff")
    .attr("stroke-width", 2);

  const tooltipBg = focusGroup
    .append("rect")
    .attr("rx", 6)
    .attr("ry", 6)
    .attr("fill", "#020617")
    .attr("opacity", 0.9);

  const tooltipText = focusGroup
    .append("text")
    .attr("fill", "#f9fafb")
    .attr("font-size", 12)
    .attr("font-family", "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif");

  const tooltipLine1 = tooltipText.append("tspan").attr("x", 0).attr("dy", "1.1em");
  const tooltipLine2 = tooltipText.append("tspan").attr("x", 0).attr("dy", "1.2em");

  const overlay = g
    .append("rect")
    .attr("fill", "transparent")
    .attr("pointer-events", "all")
    .attr("width", innerWidth)
    .attr("height", innerHeight);

  function moved(event) {
    const [mx] = d3.pointer(event);
    const domain = x.domain();
    if (!domain.length) return;
    const step = innerWidth / Math.max(domain.length - 1, 1);
    const idx = Math.round(mx / step);
    const añoCercano = domain[Math.max(0, Math.min(domain.length - 1, idx))];
    const d = filtered.find(p => p.año === añoCercano);
    if (!d) return;

    focusGroup.style("display", null);
    const cx = x(d.año);
    const cy = y(d.muertes);
    focusCircle.attr("cx", cx).attr("cy", cy);

    tooltipLine1.text(`Año: ${d.año}`);
    tooltipLine2.text(`Muertes: ${d3.format(",")(d.muertes)}`);

    const bbox = tooltipText.node().getBBox();
    const pad = 8;

    tooltipBg
      .attr("width", bbox.width + pad * 2)
      .attr("height", bbox.height + pad * 2)
      .attr("x", cx + 10)
      .attr("y", cy - bbox.height - 16);

    tooltipText.attr("x", cx + 10 + pad).attr("y", cy - bbox.height - 16 + pad);
  }

  function left() {
    focusGroup.style("display", "none");
  }

  overlay.on("pointerenter", moved).on("pointermove", moved).on("pointerleave", left);

  svg
    .append("text")
    .attr("x", padding.left)
    .attr("y", padding.top * 0.7)
    .attr("fill", colorTexto)
    .attr("font-size", 18)
    .attr("font-weight", "600")
    .attr("font-family", "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif")
    .text(titulo);
}

if (typeof window !== "undefined") {
  window.crearGraficoMuertesLinea = crearGraficoMuertesLinea;
}

