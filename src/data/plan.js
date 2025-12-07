export const planData = {
  structure: [
    {
      folder: "app/",
      children: [
        { name: "layout.tsx", comment: "// Root Metadata" },
        { name: "page.tsx", comment: "// HOME", color: "text-green-500" },
        {
          name: "productos/",
          children: [
            {
              name: "[slug]/",
              children: [
                { name: "page.tsx", color: "text-white" },
                { name: "Genera URLs como: /goleanas-legionario, /chalecos-vigilancia", comment: "text-xs", isComment: true }
              ]
            }
          ]
        },
        {
          name: "envios/",
          color: "text-purple-400",
          children: [
            {
              name: "[ciudad]/",
              children: [
                { name: "page.tsx", color: "text-white" },
                { name: "Genera URLs como: /envios/dotaciones-medellin", comment: "text-xs", isComment: true }
              ]
            }
          ]
        }
      ]
    }
  ],
  silos: [
    {
      title: "Silo 1: Nicho Seguridad (Alta Prioridad)",
      desc: "Atacar la búsqueda específica del Gerente de Operaciones.",
      type: "Transaccional",
      color: "blue",
      rows: [
        { slug: "/goleanas-legionario", h1: "Fábrica de Goleanas Tipo Legionario con Protección UV", keywords: ["Gorra legionario", "Protección solar vigilancia"] },
        { slug: "/chalecos-vigilancia", h1: "Chalecos Porta-Elementos Reglamentarios SuperVigilancia", keywords: ["Chaleco táctico", "Seguridad privada"] }
      ]
    }
  ],
  keywords: {
    seguridad: ["Fábrica dotaciones seguridad privada", "Uniformes vigilantes bogotá", "Goleanas tipo legionario"],
    industrial: ["Chalecos acolchados empresas", "Chalecos reflectivos brigadista", "Dotación industrial bogotá"],
    masivo: ["Fábrica gorras publicitarias", "Gorras campaña política por mayor", "Bolsas ecológicas cambre fábrica"]
  }
};
