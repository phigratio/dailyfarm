import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { publicAxios } from "../../services/userService/userService";

type Category = "ARTICLE" | "VIDEO";
type Link = { id: string; title: string; link: string; category: Category };

const Library = () => {
  const { toast } = useToast();

  const items = [
    { id: 1, label: "Read Article", icon: "📄", category: "ARTICLE" as Category },
    { id: 2, label: "Watch Video", icon: "📺", category: "VIDEO" as Category },
  ];

  const [modalOpen, setModalOpen] = useState(false);
  const [modalCategory, setModalCategory] = useState<Category | null>(null);
  const [articles, setArticles] = useState<Link[]>([]);
  const [videos, setVideos] = useState<Link[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch both categories when page loads
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [articleRes, videoRes] = await Promise.all([
          publicAxios.get("/api/library/category/ARTICLE"),
          publicAxios.get("/api/library/category/VIDEO"),
        ]);
        setArticles(articleRes.data);
        setVideos(videoRes.data);
      } catch {
        toast({
          title: "Error",
          description: "Failed to load articles or videos.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [toast]);

  const openModal = (category: Category) => {
    setModalCategory(category);
    setModalOpen(true);
  };

  const redirectToLink = (link: string) => {
    window.open(link, "_blank");
  };

  const linksToShow = modalCategory === "ARTICLE" ? articles : videos;

  return (
    <>
      <Navbar />
      <div className="h-24" />
      <main className="flex flex-col items-center justify-center space-y-12 px-4" style={{ height: "calc(100vh - 96px)" }}>
        <h1 className="text-4xl font-bold text-center">Learn More About Farming</h1>

        <div className="flex justify-center space-x-16">
          {items.map((item) => (
            <div
              key={item.id}
              className="w-56 h-56 flex flex-col items-center justify-center border border-gray-300 rounded-lg shadow hover:shadow-lg cursor-pointer"
              onClick={() => openModal(item.category)}
            >
              <div className="text-8xl mb-6">{item.icon}</div>
              <div className="text-2xl font-semibold">{item.label}</div>
            </div>
          ))}
        </div>

        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogContent className="max-w-4xl w-full"> {/* Make modal wider */}
            <DialogHeader>
              <DialogTitle>{modalCategory === "ARTICLE" ? "Articles to Read" : "Videos to Watch"}</DialogTitle>
            </DialogHeader>

            {loading ? (
              <p>Loading {modalCategory?.toLowerCase()}...</p>
            ) : linksToShow.length === 0 ? (
              <p>No {modalCategory?.toLowerCase()} found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="px-2 py-1 w-12">#</th>
                      <th className="px-2 py-1">Title</th>
                      <th className="px-2 py-1 w-24">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {linksToShow.map(({ id, title, link }, index) => (
                      <tr key={id} className="border-b hover:bg-gray-100">
                        <td className="px-2 py-1">{index + 1}</td>
                        <td className="px-2 py-1">{title}</td>
                        <td className="px-2 py-1">
                          <Button size="sm" onClick={() => redirectToLink(link)}>
                            {modalCategory === "ARTICLE" ? "Read" : "Watch"}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            
          </DialogContent>
        </Dialog>
      </main>
    </>
  );
};

export default Library;
