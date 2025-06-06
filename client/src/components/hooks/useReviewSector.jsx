import { useState } from "react";
import { useGetUserReviewQuery, useSendReviewMutation } from "../services/review";

export const useReviewSector = (userId) => {

    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [kinoId, setKinoId] = useState(null);

    const [send, {error, isLoading}] = useSendReviewMutation();

    const {refetch} = useGetUserReviewQuery(userId, {skip: !userId});

    const handlerSubmit = async (e) => {
        e.preventDefault();

        try {
            await send({kinopoiskId: kinoId, content, title})
            await refetch();
            setContent('')
            setTitle('')
        } catch (error) {
            console.log(error)
        }
    }

    return {content, title, kinoId, setContent, setTitle, setKinoId, handlerSubmit, error, isLoading }
}