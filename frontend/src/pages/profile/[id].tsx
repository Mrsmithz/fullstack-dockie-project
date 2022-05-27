import { Stack } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from 'next/head'
import ProfileDetail from "../../components/proflie/ProfileDetail"
import styles from '../../styles/CreatePost.module.scss'
import { gql, useQuery } from "@apollo/client";
import { isIfStatement } from "typescript";

interface Props {
    id: string
}

const GET_PROFILE_BY_ID = gql`
query ($id: MongoID!){
    userById(_id: $id){
      firstName
      lastName
      followings{
        followingId
        following{
            firstName
            lastName
            image
          }
      }
      followers{
        followerId
        follower{
            firstName
            lastName
            image
          }
      }
      posts{
        _id
        title
      }
      image
      email
      _id
    }
  }
`
const ProfilePage: NextPage<Props> = ({ id }) => {
    const {loading, error, data, refetch} = useQuery(GET_PROFILE_BY_ID, {
        variables: { id }
    })
    if(loading){
        return(
            <div>
                <h1>Loading</h1>
            </div>
        )
    }
    return (
        <div>
            <Head>
                <title>Profile</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Stack className={styles.container}>
                <ProfileDetail profile={data?.userById} refetch={refetch}></ProfileDetail>
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