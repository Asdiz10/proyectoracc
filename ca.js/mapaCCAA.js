// mapaCCAA.js
// Requiere D3 v7 y topojson-client cargados en el HTML

function crearMapaCCAA(containerSelector, geoData, datosPorComunidad, año, opciones = {}) {
  const container = d3.select(containerSelector);
  if (container.empty()) return;

  const {
    colorFondo = "#020617",
    colorTexto = "#e5e7eb",
    colorBorde = "#020617",
    escalaColores = d3.interpolateMagma,
    padding = { top: 32, right: 16, bottom: 32, left: 16 },
    titulo = `Muertes por comunidad autónoma (${año})`
  } = opciones;

  container.select("svg").remove();
  container.selectAll("div.__tooltip-mapa").remove();

  const width = container.node().clientWidth || 900;
  const height = container.node().clientHeight || 520;

  const svg = container
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .style("width", "100%")
    .style("height", "100%")
    .style("background", colorFondo);

  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;

  const g = svg.append("g").attr("transform", `translate(${padding.left},${padding.top})`);

  const features =
    geoData.type === "Topology"
      ? topojson.feature(geoData, Object.values(geoData.objects)[0]).features
      : geoData.features;

  const valores = features.map(f => {
    const nombre = f.properties.nombre;
    const registro = datosPorComunidad[nombre];
    const valor = registro && registro[año] != null ? +registro[año] : 0;
    return { nombre, valor };
  });

  const maxValor = d3.max(valores, d => d.valor) || 1;

  const color = d3
    .scaleSequential(escalaColores)
    .domain([0, maxValor]);

  const projection = d3.geoMercator().fitSize([innerWidth, innerHeight], {
    type: "FeatureCollection",
    features
  });

  const path = d3.geoPath().projection(projection);

  const tooltip = container
    .append("div")
    .attr("class", "__tooltip-mapa")
    .style("position", "absolute")
    .style("pointer-events", "none")
    .style("background", "#020617")
    .style("color", "#f9fafb")
    .style("padding", "0.45rem 0.6rem")
    .style("font-size", "0.75rem")
    .style("border-radius", "0.5rem")
    .style("border", "1px solid rgba(55,65,81,0.8)")
    .style("box-shadow", "0 18px 35px rgba(15,23,42,0.9)")
    .style("opacity", 0)
    .style("transform", "translate(-50%, -110%)")
    .style("z-index", 20);

  function handleMouseOver(event, d) {
    const nombre = d.properties.nombre;
    const registro = datosPorComunidad[nombre];
    const valor = registro && registro[año] != null ? +registro[año] : 0;

    d3.select(this)
      .attr("stroke-width", 2)
      .attr("stroke", "#f9fafb");

    tooltip
      .style("opacity", 1)
      .html(
        `<strong>${nombre}</strong><br/>Muertes ${año}: <strong>${d3.format(",")(valor)}</strong>`
      );

    const [xPos, yPos] = d3.pointer(event, container.node());
    tooltip.style("left", `${xPos}px`).style("top", `${yPos}px`);
  }

  function handleMouseMove(event) {
    const [xPos, yPos] = d3.pointer(event, container.node());
    tooltip.style("left", `${xPos}px`).style("top", `${yPos}px`);
  }

  function handleMouseOut() {
    d3.select(this).attr("stroke-width", 1).attr("stroke", colorBorde);
    tooltip.style("opacity", 0);
  }

  g.selectAll("path")
    .data(features)
    .join("path")
    .attr("d", path)
    .attr("fill", d => {
      const nombre = d.properties.nombre;
      const registro = datosPorComunidad[nombre];
      const valor = registro && registro[año] != null ? +registro[año] : 0;
      return valor > 0 ? color(valor) : "#111827";
    })
    .attr("stroke", colorBorde)
    .attr("stroke-width", 1)
    .attr("vector-effect", "non-scaling-stroke")
    .on("mouseenter", handleMouseOver)
    .on("mousemove", handleMouseMove)
    .on("mouseleave", handleMouseOut);

  // título
  svg
    .append("text")
    .attr("x", padding.left)
    .attr("y", padding.top * 0.9)
    .attr("fill", colorTexto)
    .attr("font-size", 18)
    .attr("font-weight", "600")
    .attr("font-family", "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif")
    .text(titulo);

  // leyenda
  const legendWidth = 160;
  const legendHeight = 10;
  const legendX = width - legendWidth - padding.right - 10;
  const legendY = height - padding.bottom - 30;

  const legendScale = d3.scaleLinear().domain(color.domain()).range([0, legendWidth]);

  const legend = svg.append("g").attr("transform", `translate(${legendX},${legendY})`);

  const legendGradientId = "gradMapaCCAA";
  const defs = svg.append("defs");
  const gradient = defs.append("linearGradient").attr("id", legendGradientId);

  gradient.attr("x1", "0%").attr("x2", "100%").attr("y1", "0%").attr("y2", "0%");

  d3.range(0, 1.01, 0.1).forEach(t => {
    gradient
      .append("stop")
      .attr("offset", `${t * 100}%`)
      .attr("stop-color", color(legendScale.invert(t * legendWidth)));
  });

  legend
    .append("rect")
    .attr("width", legendWidth)
    .attr("height", legendHeight)
    .attr("rx", 4)
    .attr("fill", `url(#${legendGradientId})`);

  const legendAxis = d3
    .axisBottom(legendScale)
    .ticks(3)
    .tickSize(4)
    .tickFormat(d3.format(".2s"));

  legend
    .append("g")
    .attr("transform", `translate(0,${legendHeight})`)
    .call(legendAxis)
    .selectAll("text")
    .attr("fill", colorTexto)
    .attr("font-size", 9);

  legend.selectAll(".domain, .tick line").attr("stroke", "#4b5563");
}

if (typeof window !== "undefined") {
  window.crearMapaCCAA = crearMapaCCAA;
}

