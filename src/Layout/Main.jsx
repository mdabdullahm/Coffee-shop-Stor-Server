import { Outlet, useNavigation } from "react-router-dom";
import Header from "../components/Header";

const Main = () => {
    const navigation = useNavigation();

    return (
        <div>
            <Header />
            {
                // শুধুমাত্র রাউটার নেভিগেশনের জন্য স্পিনার
                navigation.state === 'loading' ? 
                <div className="flex justify-center items-center" style={{height: 'calc(100vh - 80px)'}}>
                    <span className="loading loading-spinner loading-lg text-amber-500"></span>
                </div> 
                : 
                <Outlet /> 
            }
        </div>
    );
};

export default Main;