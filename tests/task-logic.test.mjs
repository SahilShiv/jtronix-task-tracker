import { test, describe } from 'node:test';
import assert from 'node:assert/strict';

describe('Task Tracker Core Business Logic & State Operations', () => {
  // Mock task generator
  const createMockTask = (id, title, completed = false) => ({
    id,
    title,
    completed,
    createdAt: new Date().toISOString(),
  });

  describe('1. Task Creation & Validation (Question 1.1)', () => {
    test('rejects empty strings and whitespace-only strings', () => {
      const validateInput = (input) => {
        const trimmed = input.trim();
        return trimmed.length > 0;
      };

      assert.equal(validateInput(''), false);
      assert.equal(validateInput('   '), false);
      assert.equal(validateInput('\t\n'), false);
      assert.equal(validateInput('Valid Task'), true);
      assert.equal(validateInput('   Task with padding   '), true);
    });

    test('trims surrounding whitespace before saving', () => {
      const rawInput = '   Prepare quarterly review   ';
      const cleanTitle = rawInput.trim();
      const task = createMockTask('task-1', cleanTitle);

      assert.equal(task.title, 'Prepare quarterly review');
      assert.equal(task.completed, false);
    });

    test('adds new task to the top of the list', () => {
      const initialTasks = [
        createMockTask('task-1', 'Existing Task 1'),
        createMockTask('task-2', 'Existing Task 2'),
      ];
      const newTask = createMockTask('task-3', 'Brand New Task');
      const updatedTasks = [newTask, ...initialTasks];

      assert.equal(updatedTasks.length, 3);
      assert.equal(updatedTasks[0].id, 'task-3');
      assert.equal(updatedTasks[0].title, 'Brand New Task');
    });
  });

  describe('2. Task Management & Statistics (Question 1.2)', () => {
    test('toggles task completion between completed and pending', () => {
      let task = createMockTask('task-1', 'Audit security', false);
      assert.equal(task.completed, false);

      // Toggle to complete
      task = { ...task, completed: !task.completed };
      assert.equal(task.completed, true);

      // Reopen to pending
      task = { ...task, completed: !task.completed };
      assert.equal(task.completed, false);
    });

    test('deletes only the selected task', () => {
      const tasks = [
        createMockTask('t-1', 'First'),
        createMockTask('t-2', 'Second'),
        createMockTask('t-3', 'Third'),
      ];

      const afterDelete = tasks.filter((t) => t.id !== 't-2');
      assert.equal(afterDelete.length, 2);
      assert.equal(afterDelete.some((t) => t.id === 't-2'), false);
      assert.equal(afterDelete[0].id, 't-1');
      assert.equal(afterDelete[1].id, 't-3');
    });

    test('calculates accurate statistics and completion rate', () => {
      const calculateStats = (items) => {
        const total = items.length;
        const completed = items.filter((t) => t.completed).length;
        const pending = total - completed;
        const completionRate = total === 0 ? 0 : Math.round((completed / total) * 100);
        return { total, completed, pending, completionRate };
      };

      // Empty list
      assert.deepEqual(calculateStats([]), {
        total: 0,
        completed: 0,
        pending: 0,
        completionRate: 0,
      });

      // Sample list
      const sample = [
        createMockTask('t-1', 'Task 1', true),
        createMockTask('t-2', 'Task 2', true),
        createMockTask('t-3', 'Task 3', false),
        createMockTask('t-4', 'Task 4', false),
        createMockTask('t-5', 'Task 5', false),
      ];
      assert.deepEqual(calculateStats(sample), {
        total: 5,
        completed: 2,
        pending: 3,
        completionRate: 40,
      });

      // 100% complete
      const allDone = [
        createMockTask('t-1', 'Task 1', true),
        createMockTask('t-2', 'Task 2', true),
      ];
      assert.deepEqual(calculateStats(allDone), {
        total: 2,
        completed: 2,
        pending: 0,
        completionRate: 100,
      });
    });
  });

  describe('3. Filtering Logic (Question 1.3)', () => {
    const mixedTasks = [
      createMockTask('t-1', 'Task 1', true),
      createMockTask('t-2', 'Task 2', false),
      createMockTask('t-3', 'Task 3', true),
      createMockTask('t-4', 'Task 4', false),
    ];

    const filterTasks = (tasks, filter) => {
      switch (filter) {
        case 'pending':
          return tasks.filter((t) => !t.completed);
        case 'completed':
          return tasks.filter((t) => t.completed);
        case 'all':
        default:
          return tasks;
      }
    };

    test('filter "all" returns every task without modification', () => {
      const result = filterTasks(mixedTasks, 'all');
      assert.equal(result.length, 4);
    });

    test('filter "pending" returns only incomplete tasks', () => {
      const result = filterTasks(mixedTasks, 'pending');
      assert.equal(result.length, 2);
      assert.ok(result.every((t) => !t.completed));
    });

    test('filter "completed" returns only finished tasks', () => {
      const result = filterTasks(mixedTasks, 'completed');
      assert.equal(result.length, 2);
      assert.ok(result.every((t) => t.completed));
    });
  });

  describe('4. Storage Resilience & Deserialization', () => {
    test('filters out corrupted items during deserialization', () => {
      const rawStored = JSON.stringify([
        { id: 't-1', title: 'Valid 1', completed: false, createdAt: '2026-01-01' },
        null,
        { broken: true },
        { id: 't-2', title: 'Valid 2', completed: true, createdAt: '2026-01-01' },
        'string instead of object',
      ]);

      const parsed = JSON.parse(rawStored);
      const validTasks = parsed.filter(
        (item) =>
          item &&
          typeof item.id === 'string' &&
          typeof item.title === 'string' &&
          typeof item.completed === 'boolean'
      );

      assert.equal(validTasks.length, 2);
      assert.equal(validTasks[0].id, 't-1');
      assert.equal(validTasks[1].id, 't-2');
    });
  });
});
