import { Box, Flex, Stack, Text } from '@chakra-ui/react'

import styles from '../../styles/component/Progressbar.module.scss'

type Props = {
  tasks: any[],
  state: number
}

const TaskProgress = ({ tasks, state }: Props) => {

  return (
    <Flex className={styles.taskProgressBox}>

      {tasks.map((item, index) => (
        <Flex key={`task-${index}`} position="relative">

            { index > 0 ? (
                <Box className={`${styles.taskSeperator} ${state >= index+1 ? styles.active : ''}`} />
            ) : null}

            <Stack textAlign="center">
                <Box className={`${styles.taskItem} ${state >= index+1 ? styles.active : ''}`}>
                    <Box className={`${styles.taskIcon} ${state >= index+1 ? styles.active : ''}`}>
                        {item.icon}
                    </Box>
                </Box>
                <Text className={`${styles.taskText} ${state >= index+1 ? styles.active : ''}`}>{item.taskName}</Text>
            </Stack>

        </Flex>
      ))}

    </Flex>
  )
}

export default TaskProgress