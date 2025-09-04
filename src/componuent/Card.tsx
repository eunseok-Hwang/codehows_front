import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";

type ImgCardProps = {
    title: string;
    content: string;
    img: string;
}

export default function ImgCard({ title, content, img }: ImgCardProps) {

    return (
        <Card sx={{ width: 300 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    image={`http://localhost:5173/api/images/${img}`}
                    alt="green iguana"
                    style={{ height: 250 }}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {content}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}