import { useNavigate } from 'react-router-dom';
import { NavBar } from './NavBar';
export function View() {
    const navigate = useNavigate();

    return (
       <div className="bg-blue-100 min-h-screen">
            <NavBar/>
            <div className="flex flex-col items-center justify-center p-6">
                <h1 className="text-2xl font-bold mb-4">The page is not yet ready</h1>
            </div>
        </div>
    );
}
