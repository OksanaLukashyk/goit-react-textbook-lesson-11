import { statusFilters } from './constants';
import { combineReducers } from 'redux';

// const initialState = {
//   tasks: [
//     { id: 0, text: 'Learn HTML and CSS', completed: true },
//     { id: 1, text: 'Get good at JavaScript', completed: true },
//     { id: 2, text: 'Master React', completed: false },
//     { id: 3, text: 'Discover Redux', completed: false },
//     { id: 4, text: 'Build amazing apps', completed: false },
//   ],
//   filters: {
//     status: statusFilters.all,
//   },
// };

// // Використовуємо initialState як значення стану за умовчанням
// export const rootReducer = (state = initialState, action) => {
//   // Редюсер розрізняє екшени за значенням властивості type
//   switch (action.type) {
//     // Залежно від типу екшену виконуватиметься різна логіка
//     case 'tasks/addTask':
//       // Потрібно повернути новий об'єкт стану
//       return {
//         // в якому є всі дані існуючого стану
//         ...state,
//         // та новий масив задач
//         tasks: [
//           // в якому є всі існуючі завдання
//           ...state.tasks,
//           // та об'єкт нового завдання
//           action.payload,
//         ],
//       };

//     case 'tasks/deleteTask':
//       return {
//         ...state,
//         tasks: state.tasks.filter(task => task.id !== action.payload),
//       };
//     case 'tasks/toggleCompleted':
//       return {
//         ...state,
//         tasks: state.tasks.map(task => {
//           if (task.id !== action.payload) {
//             return task;
//           }
//           return {
//             ...task,
//             completed: !task.completed,
//           };
//         }),
//       };
//     case 'filters/setStatusFilter':
//       return {
//         ...state,
//         filters: {
//           ...state.filters,
//           status: action.payload,
//         },
//       };
//     default:
//       // Кожен редюсер отримує всі екшени, відправлені в стор.
//       // Якщо редюсер не повинен обробляти якийсь тип екшену,
//       // необхідно повернути наявний стан без змін.
//       return state;
//   }
// };

// Розділимо обробку екшенів завдань та зміни фільтра на два незалежних редюсера. Кожен редюсер відповідатиме лише за свою частину стану Redux, тому код оновлення стану буде значно простіше.

const tasksInitialState = [
  { id: 0, text: 'Learn HTML and CSS', completed: true },
  { id: 1, text: 'Get good at JavaScript', completed: true },
  { id: 2, text: 'Master React', completed: false },
  { id: 3, text: 'Discover Redux', completed: false },
  { id: 4, text: 'Build amazing apps', completed: false },
];

// Відповідає лише за оновлення властивості tasks
// Тепер значенням параметра state буде масив завдань
const tasksReducer = (state = tasksInitialState, action) => {
  switch (action.type) {
    case 'tasks/addTask':
      return [...state, action.payload];
    case 'tasks/deleteTask':
      return state.filter(task => task.id !== action.payload);
    case 'tasks/toggleCompleted':
      return state.map(task => {
        if (task.id !== action.payload) {
          return task;
        }
        return { ...task, completed: !task.completed };
      });
    default:
      return state;
  }
};

const filtersInitialState = {
  status: statusFilters.all,
};

// Відповідає лише за оновлення властивості filters
// Тепер значенням параметра state буде об'єкт фільтрів
const filtersReducer = (state = filtersInitialState, action) => {
  switch (action.type) {
    case 'filters/setStatusFilter':
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
};

// написати кореневий редюсер так, щоб він просто викликав два інші редюсери і передавав їм необхідну частину стану та екшен.
// export const rootReducer = (state = {}, action) => {
//   // Повертаємо об'єкт стану
//   return {
//     // Обом редюсерам передаємо тільки частину стану, за яку вони відповідають.
//     tasks: tasksReducer(state.tasks, action),
//     filters: filtersReducer(state.filters, action),
//   };
// };
// Щоб не створювати кореневий редюсер вручну, у бібліотеці Redux є функція combineReducers, яка робить те саме, але коротше.
export const rootReducer = combineReducers({
  tasks: tasksReducer,
  filters: filtersReducer,
});
