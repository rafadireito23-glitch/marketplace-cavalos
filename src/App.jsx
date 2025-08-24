import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Search, PlusCircle } from "lucide-react";

export default function App() {
  const [search, setSearch] = useState("");
  const [view, setView] = useState("list");
  const [horses, setHorses] = useState([
    {
      id: 1,
      name: "Mangalarga Marchador - Campeão",
      price: "R$ 25.000",
      location: "Belo Horizonte - MG",
      image: "https://images.unsplash.com/photo-1504515991093-3d3aa3f20b7a",
    },
    {
      id: 2,
      name: "Potro Marchador - Registrado",
      price: "R$ 12.000",
      location: "São Paulo - SP",
      image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5",
    },
    {
      id: 3,
      name: "Égua Marchador - Pronta para criar",
      price: "R$ 18.000",
      location: "Curitiba - PR",
      image: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5f",
    },
  ]);

  const [newHorse, setNewHorse] = useState({
    name: "",
    price: "",
    location: "",
    image: "",
  });

  const filtered = horses.filter((h) =>
    h.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddHorse = () => {
    if (!newHorse.name || !newHorse.price) return;
    setHorses([...horses, { ...newHorse, id: horses.length + 1 }]);
    setNewHorse({ name: "", price: "", location: "", image: "" });
    setView("list");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">
        🐴 Marketplace de Cavalos
      </h1>

      {view === "list" && (
        <>
          <div className="flex gap-2 mb-6">
            <Input
              placeholder="Buscar cavalo..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button>
              <Search className="w-4 h-4" />
            </Button>
            <Button onClick={() => setView("add")}>
              <PlusCircle className="w-4 h-4 mr-2" /> Anunciar
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((horse) => (
              <Card key={horse.id} className="rounded-2xl shadow-lg overflow-hidden">
                <img
                  src={horse.image}
                  alt={horse.name}
                  className="h-48 w-full object-cover"
                />
                <CardContent className="p-4">
                  <h2 className="text-lg font-semibold">{horse.name}</h2>
                  <p className="text-gray-700">{horse.price}</p>
                  <p className="text-sm text-gray-500">{horse.location}</p>
                  <div className="flex justify-between mt-3">
                    <Button className="rounded-xl">Ver Detalhes</Button>
                    <Button variant="ghost">
                      <Heart className="w-5 h-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}

      {view === "add" && (
        <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-bold mb-4">📌 Novo Anúncio</h2>
          <div className="flex flex-col gap-3">
            <Input
              placeholder="Nome do cavalo"
              value={newHorse.name}
              onChange={(e) => setNewHorse({ ...newHorse, name: e.target.value })}
            />
            <Input
              placeholder="Preço (ex: R$ 20.000)"
              value={newHorse.price}
              onChange={(e) => setNewHorse({ ...newHorse, price: e.target.value })}
            />
            <Input
              placeholder="Localização"
              value={newHorse.location}
              onChange={(e) =>
                setNewHorse({ ...newHorse, location: e.target.value })
              }
            />
            <Input
              placeholder="URL da imagem"
              value={newHorse.image}
              onChange={(e) => setNewHorse({ ...newHorse, image: e.target.value })}
            />

            <div className="flex justify-between mt-4">
              <Button onClick={handleAddHorse} className="rounded-xl bg-green-600">
                Salvar Anúncio
              </Button>
              <Button
                variant="outline"
                onClick={() => setView("list")}
                className="rounded-xl"
              >
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}