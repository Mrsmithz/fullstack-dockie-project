import { Stack } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from 'next/head'
import ProfileDetail from "../../components/proflie/ProfileDetail"
import styles from '../../styles/CreatePost.module.scss'

interface Props {
    id: string
}
const ProfilePage: NextPage<Props> = ({ id }) => {
    return (
        <div>
            <Head>
                <title>Profile</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Stack className={styles.container}>
                <ProfileDetail></ProfileDetail>
            </Stack>
        </div>
    )
}

export const getServerSideProps = (context: any) => {
    const { id } = context.query;
    return {
        props: {
            id,
        },
    };
};

export default ProfilePage