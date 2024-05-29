import { Outlet, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { Tab, TabGroup, TabContent } from "../../../components/Tab";
import { lastPathPart } from "../../../utils/utils";
import Button from "../../../components/Button";
import { useState, useContext } from "react";
import { NumberOfElementsContext } from "../../../contexts/NumberOfElementsContext";

const Movies = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [numberOfElements, setNumberOfElements] = useState({ drafts: 0, currently: 0, upcoming: 0, archived: 0 })
    const [selectedTab, setSelectedTab] = useState(lastPathPart(location.pathname) || 'drafts');

    const navigateToTab = (tab) => {
        setSelectedTab(tab);
        navigate(`/admin-panel/movies/${tab}`);
    };

    return (
        <div className="pt-32 px-40 font-body text-neutral-800 w-full">
            <div className="flex">
                <p className="text-heading-h6 pb-16 flex-1">Movies</p>
                <Button onClick={ () => navigate('/admin-panel/add-movie', { state: { from: location.pathname } }) }>Add Movie</Button>
            </div>
            <NumberOfElementsContext.Provider value={ { numberOfElements, setNumberOfElements } }>
                <TabGroup selected={ selectedTab } onChange={ navigateToTab }>
                    <Tab value="drafts">Drafts ({ numberOfElements.drafts })</Tab>
                    <Tab value="currently">Currently Showing ({ numberOfElements.currently })</Tab>
                    <Tab value="upcoming">Upcoming ({ numberOfElements.upcoming })</Tab>
                    <Tab value="archived">Archived ({ numberOfElements.archived })</Tab>
                </TabGroup>

                <TabContent>
                    <Outlet />
                </TabContent>
            </NumberOfElementsContext.Provider>

        </div>
    );
};

export default Movies;
