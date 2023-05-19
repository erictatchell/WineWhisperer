interface TopPicksProps {
    wines: Wine[];
}
interface SavedProps{
    wines: Wine[];
}

interface Wine {
    _id: string;
    id: number;
    country: string;
    description: string;
    designation: string;
    points: number;
    price: number;
    province: string;
    region_1: string;
    region_2: string;
    taster_name: string;
    taster_twitter_handle: string;
    title: string;
    variety: string;
    winery: string;
    eco: boolean;
    blurb: string;
    image: string;
}