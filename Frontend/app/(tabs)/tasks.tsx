import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';    

import { colors, spacing, typography } from '@/components/main/design-tokens';
import Header from '@/components/header';
import HeaderTask from '@/components/tasks/headersTask';
import TaskFilterBar from '@/components/tasks/filter';
import TaskCard from '@/components/tasks/task';
import { TaskPriority, TaskStatus } from '@shared/types';
import { useTasksStore } from '@/store/useTasksStore';
import { useChangeStatusTask } from '@/hooks/tasks/createTask';
import { filterTasksByDate } from '@/utils/task.utils';

import ButtonCreate from '@/components/tasks/buttonCreate';

const formatDate = (date: Date) =>
  date.toLocaleDateString('uk-UA', { day: '2-digit', month: '2-digit', year: 'numeric' });


export default function TaskScreen() {
    const tasks = useTasksStore((state) => state.tasks);
    const [activeFilter, setActiveFilter] = useState('today');

    const tasks_expired = tasks.filter((task) => task.status === TaskStatus.Expired);
    const task_done_inprogress = tasks.filter((task) => task.status === TaskStatus.Done || task.status === TaskStatus.InProgress);
    
    const filteredTasks = filterTasksByDate(task_done_inprogress, activeFilter);

    const { changeStatus } = useChangeStatusTask();

    const handleStatusChange = (taskId: string, status: TaskStatus) => {
      const newStatus = status === TaskStatus.Done ? TaskStatus.InProgress : TaskStatus.Done;
      changeStatus(taskId, newStatus);
    };

    return (
      <View style={styles.screen}>
        <Header/>
   
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={{ ...styles.content, paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
          
        >
          <HeaderTask
          />

          <TaskFilterBar
            activeFilter={activeFilter} 
            onFilterChange={setActiveFilter}    
          />

          <ButtonCreate/>

          <View>
            <Text>Список завдань:</Text>
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                id={task.id}
                priority={task.priority}
                title={task.name}
                status={task.status}
                description={task.description}
                onDone={() => handleStatusChange(task.id, task.status)}
                timeLeft={formatDate(task.dateEnd)}
              />
            ))}
          </View>


          <View>
            {tasks_expired.length > 0 && (
              <>
                <Text style={styles.display}>Пропущені:</Text>
                {tasks_expired.map((task) => (
                  <TaskCard
                    key={task.id}
                    id={task.id}
                    priority={task.priority}
                    title={task.name}
                    status={task.status}
                    description={task.description}
                    timeLeft={formatDate(task.dateEnd)}
                  />
                ))}
              </>
            )}
          </View>
        </ScrollView>
      </View>
    );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    gap: spacing.md,
  },
  bottomSpacer: {
    height: 100,
  },
  voiceWrap: {
    position: 'absolute',
    bottom: 96,
    left: 0,
    right: 0,
    alignItems: 'center',
  },

  display: {
    ...typography.display,
    fontSize: 18,
    color: '#6f6f6fff'
  },
});