import { Button } from "@/components/ui/button";
import { PlusCircle, Calendar, Lightbulb, Zap, MessageSquare, Settings, Info, User, HelpCircle, Mail, Search, X, Clock, Repeat } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import faqData from "@/lib/faq.json";

interface Artist {
  id: string;
  name: string;
}

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [selectedArtists, setSelectedArtists] = useState<Artist[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [faq] = useState(faqData.faq);

  const mockArtistSearch = (term: string): Artist[] => {
    const allArtists: Artist[] = [
      { id: "1", name: "Artist One" },
      { id: "2", name: "Artist Two" },
      { id: "3", name: "Artist Three" },
    ];
    return allArtists.filter(artist => artist.name.toLowerCase().includes(term.toLowerCase()));
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-10 py-6 flex justify-between items-center">
          <div className="flex items-center gap-1">
            <img 
              src="src/assets/postflow_logo.svg" 
              alt="PostFlow Logo" 
              className="h-25 w-20"
            />
            <div>
              <h1 className="text-5xl font-bold">ostFlow</h1>
              <p className="text-muted-foreground mt-1">Supporting musicians in content planning to make them viral</p>
            </div>
          </div>
          
          <div className="flex items-center gap-8">
            
            <Button variant="ghost" size="icon"><Settings className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon"><Info className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon"><User className="h-4 w-4" /></Button>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon"><HelpCircle className="h-4 w-4" /></Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>FAQ</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  {faq.map((item, index) => (
                    <div key={index} className="space-y-1">
                      <h4 className="font-medium">{item.question}</h4>
                      <p className="text-sm text-muted-foreground">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => window.location.href = 'mailto:yagomj@gmail.com'}
            >
              <Mail className="h-4 w-4" />
            </Button>
            
            <Button variant="default" className="bg-primary hover:bg-primary/90">Sign Up</Button>
            <Button variant="ghost">Sign In</Button>
            
          </div>
        </div>
      </header>

      <div className="container mx-auto py-6">
        <div className="grid grid-cols-12 gap-6">
          <aside className="col-span-3 space-y-6">
            <nav className="space-y-2">
              <Button variant="ghost" className="w-full justify-start text-primary hover:text-primary hover:bg-primary/10">
                <Calendar className="mr-2 h-4 w-4" />
                Calendar
              </Button>
              <Button variant="ghost" className="w-full justify-start text-primary hover:text-primary hover:bg-primary/10">
                <Lightbulb className="mr-2 h-4 w-4" />
                Ideas
              </Button>
              <Button variant="ghost" className="w-full justify-start text-primary hover:text-primary hover:bg-primary/10">
                <Zap className="mr-2 h-4 w-4" />
                Flash
              </Button>
              <Button variant="ghost" className="w-full justify-start text-primary hover:text-primary hover:bg-primary/10">
                <Clock className="mr-2 h-4 w-4" />
                Schedule
              </Button>
              <Button variant="ghost" className="w-full justify-start text-primary hover:text-primary hover:bg-primary/10">
                <Repeat className="mr-2 h-4 w-4" />
                Serializer
              </Button>
            </nav>

            <Card className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <Search className="h-5 w-5" />
                <h3 className="font-medium">Spotify Artists</h3>
              </div>
              <div className="space-y-4">
                <Input
                  placeholder="Search artists..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
                {searchTerm && (
                  <div className="bg-background rounded-md shadow-sm">
                    {mockArtistSearch(searchTerm).map(artist => (
                      <button
                        key={artist.id}
                        className="w-full text-left px-4 py-2 hover:bg-accent"
                        onClick={() => {
                          setSelectedArtists(prev => [...prev, artist]);
                          setSearchTerm("");
                        }}
                      >
                        {artist.name}
                      </button>
                    ))}
                  </div>
                )}
                <div className="flex flex-wrap gap-2">
                  {selectedArtists.map(artist => (
                    <Badge key={artist.id} variant="secondary">
                      {artist.name}
                      <button onClick={() => setSelectedArtists(prev => prev.filter(a => a.id !== artist.id))}>
                        <X className="w-3 h-3 ml-1" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
            
            <Card className="p-4 bg-card">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="h-5 w-5" />
                <h3 className="font-medium">Assistant</h3>
              </div>
              <textarea
                className="h-[400px] w-full rounded-lg bg-background/50 p-4 text-sm text-muted-foreground resize-none focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="How can I help you today?"
              />
            </Card>
          </aside>
          
          <main className="col-span-9">
            {children}
          </main>
        </div>
      </div>

      <footer className="bg-background border-t mt-20">
        <div className="container mx-auto px-8 py-12">
          <div className="grid grid-cols-5 gap-8 mb-12">
            {/* Columna 1 */}
            <div className="space-y-4">
              <h3 className="font-semibold mb-4">Descubre</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Artistas Spotify</li>
                <li>Guías de contenido</li>
                <li>Servicios</li>
                <li>Ofertas</li>
                <li>Ponte en contacto</li>
              </ul>
            </div>

            {/* Columna 2 */}
            <div className="space-y-4">
              <h3 className="font-semibold mb-4">PostFlow</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Instagram</li>
                <li>GitHub</li>
                <li>Acerca de PostFlow</li>
                <li>Trabajar con nosotros</li>
                <li>Noticias recientes</li>
              </ul>
            </div>

            {/* Columna 3 */}
            <div className="space-y-4">
              <h3 className="font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Equipo</li>
                <li>Relaciones con inversores</li>
                <li>Responsabilidad corporativa</li>
                <li>Canal de denuncias</li>
              </ul>
            </div>

            {/* Columna 4 */}
            <div className="space-y-4">
              <h3 className="font-semibold mb-4">Sigue a PostFlow</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>X</li>
                <li>LinkedIn</li>
                <li>Instagram</li>
              </ul>
            </div>

            {/* Columna 5 */}
            <div className="space-y-4">
              <h3 className="font-semibold mb-4">Información para</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Pequeños artistas</li>
                <li>Proveedores de servicios</li>
                <li>Desarrolladores</li>
              </ul>
            </div>
          </div>

          <div className="border-t pt-8 flex justify-between items-center">
            <div className="flex space-x-6 text-sm text-muted-foreground">
              <span>Contacto</span>
              <span>Privacidad</span>
              <span>Condiciones de uso</span>
              <span>Accesibilidad</span>
              <span>Preferencias sobre cookies</span>
            </div>

            <div className="flex items-center space-x-2 text-sm">
              <img 
                src="/spain-flag.png" 
                alt="España" 
                className="w-5 h-5 rounded-sm"
              />
              <span className="text-muted-foreground">España - Español</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};