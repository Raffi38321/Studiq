import {House, Pencil} from "lucide-react"

interface NavbarProps {
    
}

const Navbar: React.FC<NavbarProps> = () => {
    return (
    <nav className="bg-[#D9D9D9] flex items-center justify-between p-4">
        <h1 className="text-l font-bold text-[#222222]">StudiQ</h1>
        <section className="flex gap-4">
            <House  className="size-9 border-2 border-[#222222] bg-[#FF4F00] p-2 text-[#222222] shadow-[4px_4px_0px_#222222] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#222222]" />
            <Pencil className="size-9 border-2 border-[#222222] bg-[#00BFFF] p-2 text-[#222222] shadow-[4px_4px_0px_#222222] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#222222]" />
        </section>
    </nav>
    );
}

export default Navbar;