import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Tab, TabGroup, TabContent } from "../../../components/Tab";
import { lastPathPart } from "../../../utils/utils";
import Button from "../../../components/Button";

const Movies = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const tab = lastPathPart(location.pathname) || 'drafts';

    const navigateToTab = (tab) => {
        navigate(`/admin-panel/movies/${tab}`);
    };

    return (
        <div className="pt-32 px-40 font-body text-neutral-800 w-full">
            <div className="flex">
                <p className="text-heading-h6 pb-16 flex-1">Movies</p>
                <Button onClick={ () => navigate('/admin-panel/add-movie', { state: { from: location.pathname } }) }>Add Movie</Button>
            </div>
            <TabGroup selected={ tab } onChange={ navigateToTab }>
                <Tab value="drafts">Drafts (0)</Tab>
                <Tab value="currently">Currently Showing (0)</Tab>
                <Tab value="upcoming">Upcoming (0)</Tab>
                <Tab value="archived">Archived (0)</Tab>
            </TabGroup>

            <TabContent>
                <Outlet />
            </TabContent>
        </div>
    );
};

export default Movies;
