using System;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Media;
using System.Windows.Shapes;

namespace FractalTree.Main
{
   
    public partial class MainWindow : Window
    {
        private Random random = new Random();

        // Параметры для настройки
        private int recursionDepth = 6; // Глубина рекурсии
        private double branchProbability = 0.8; // Вероятность создания ветки
        private double baseAngle = 30; // Базовый угол ветвления
        private int branchesPerNode = 3; // Количество ветвей на каждом узле

        public MainWindow()
        {
            InitializeComponent();

            // Отрисовка первого дерева
            DrawFractalTree();
        }

        private void DrawFractalTree()
        {
            // Очистка канвы
            MainCanvas.Children.Clear();

            // Начальные координаты дерева
            double startX = MainCanvas.ActualWidth / 2;
            double startY = MainCanvas.ActualHeight - 50;

            // Запускаем рекурсивное рисование дерева
            DrawBranch(startX, startY, -90, 100, 0, recursionDepth);
        }

        private void DrawBranch(double x, double y, double angle, double length, int level, int maxLevel)
        {
            if (level > maxLevel || length < 5)
                return;

            // Конечная точка текущей ветки
            double x2 = x + Math.Cos(angle * Math.PI / 180) * length;
            double y2 = y + Math.Sin(angle * Math.PI / 180) * length;

            // Устанавливаем цвет и толщину ветки
            Brush color = level < 3 ? Brushes.SaddleBrown : Brushes.ForestGreen;
            double thickness = level < 3 ? maxLevel - level + 1 : 1;

            Line branch = new Line
            {
                X1 = x,
                Y1 = y,
                X2 = x2,
                Y2 = y2,
                Stroke = color,
                StrokeThickness = thickness
            };

            MainCanvas.Children.Add(branch);

            // Если вероятность создания ветки не срабатывает, ветвь не создается
            if (random.NextDouble() > branchProbability)
                return;

            // Рисуем несколько ветвей из разных точек вдоль текущей ветки
            for (int i = 0; i < branchesPerNode; i++)
            {
                // Случайная точка вдоль текущей ветки
                double branchingPoint = random.NextDouble(); // От 0 (начало) до 1 (конец)
                double startX = x + (x2 - x) * branchingPoint;
                double startY = y + (y2 - y) * branchingPoint;

                // Угол и длина новой ветки
                double totalAngleSpread = baseAngle * 2; // Угол разброса
                double angleStep = totalAngleSpread / (branchesPerNode - 1); // Шаг угла
                double newAngle = angle - baseAngle + i * angleStep;

                // Добавляем небольшое случайное отклонение
                newAngle += random.NextDouble() * 10 - 5;

                double lengthReduction = random.NextDouble() * 0.2 + 0.6; // Уменьшение длины

                DrawBranch(startX, startY, newAngle, length * lengthReduction, level + 1, maxLevel);
            }
        }



        private void ResetButton_Click(object sender, RoutedEventArgs e)
        {
            // Считываем параметры из текстовых полей
            if (int.TryParse(DepthInput.Text, out int depth))
                recursionDepth = depth;

            if (double.TryParse(ProbabilityInput.Text, out double probability))
                branchProbability = Math.Clamp(probability, 0.0, 1.0); // Ограничиваем вероятность от 0 до 1

            if (double.TryParse(AngleInput.Text, out double angle))
                baseAngle = angle;

            if (int.TryParse(BranchesInput.Text, out int branches))
                branchesPerNode = Math.Max(2, branches); // Минимум 1 ветка

            DrawFractalTree();
        }

    }
}