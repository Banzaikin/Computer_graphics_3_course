using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Media.Media3D;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace Fractal
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        private const double InitialSize = 10; // Размер начального квадрата
        private MeshGeometry3D landscapeMesh;
        private GeometryModel3D landscapeModel;

        public MainWindow()
        {
            InitializeComponent();
            GenerateLandscape(5, 0.8);
        }

        private void GenerateButton_Click(object sender, RoutedEventArgs e)
        {
            // Получаем глубину рекурсии и коэффициент случайности из интерфейса
            if (int.TryParse(DepthInput.Text, out int depth) &&
                double.TryParse(RandomnessInput.Text, out double randomness))
            {
                GenerateLandscape(depth, randomness);
            }
            else
            {
                MessageBox.Show("Некорректные параметры. Проверьте ввод.");
            }
        }

        private Color GetColorBasedOnHeight(double height)
        {
            if (height < 0.3) return Colors.Blue;          // Вода
            if (height < 0.4) return Colors.SandyBrown;    // Песок
            if (height < 0.6) return Colors.Green;         // Трава
            return Colors.Gray;                            // Горы
        }

        private void GenerateLandscape(int depth, double randomness)
        {
            // Создаем новый MeshGeometry3D
            landscapeMesh = new MeshGeometry3D();

            // Используем DiffuseMaterial для реагирования на свет
            var material = new DiffuseMaterial
            {
                Brush = new SolidColorBrush(Colors.Green) // Зеленый для земли
            };
            landscapeModel = new GeometryModel3D(landscapeMesh, material);

            var modelVisual = new ModelVisual3D { Content = landscapeModel };
            Viewport.Children.Clear();
            Viewport.Children.Add(modelVisual);



            // Генерация ландшафта
            var size = InitialSize;
            var heights = DiamondSquare(depth, randomness, size);
            BuildMesh(heights, size);

            // Центрируем ландшафт
            CenterLandscape(size);

            // Добавляем освещение
            var directionalLight = new DirectionalLight
            {
                Color = Colors.White,
                Direction = new Vector3D(-1, -1, -1) // Направление света
            };
            Viewport.Children.Add(new ModelVisual3D { Content = directionalLight });

            // Опционально: общий свет
            var ambientLight = new AmbientLight
            {
                Color = Colors.Gray // Тусклый общий свет
            };
            Viewport.Children.Add(new ModelVisual3D { Content = ambientLight });
        }


        private double[,] DiamondSquare(int depth, double randomness, double size)
        {
            int pointsPerSide = (int)Math.Pow(2, depth) + 1;
            double[,] heights = new double[pointsPerSide, pointsPerSide];
            var random = new Random();

            // Инициализация углов
            heights[0, 0] = random.NextDouble();
            heights[0, pointsPerSide - 1] = random.NextDouble();
            heights[pointsPerSide - 1, 0] = random.NextDouble();
            heights[pointsPerSide - 1, pointsPerSide - 1] = random.NextDouble();

            int step = pointsPerSide - 1;
            while (step > 1)
            {
                // Алгоритм "Diamond" шаг
                for (int x = 0; x < pointsPerSide - 1; x += step)
                {
                    for (int y = 0; y < pointsPerSide - 1; y += step)
                    {
                        double avg = (heights[x, y] +
                                      heights[x + step, y] +
                                      heights[x, y + step] +
                                      heights[x + step, y + step]) / 4.0;

                        heights[x + step / 2, y + step / 2] = avg + (random.NextDouble() * 2 - 1) * randomness * step / size;
                    }
                }

                // Алгоритм "Square" шаг
                for (int x = 0; x < pointsPerSide; x += step / 2)
                {
                    for (int y = (x + step / 2) % step; y < pointsPerSide; y += step)
                    {
                        double sum = 0;
                        int count = 0;

                        if (x >= step / 2) { sum += heights[x - step / 2, y]; count++; }
                        if (x + step / 2 < pointsPerSide) { sum += heights[x + step / 2, y]; count++; }
                        if (y >= step / 2) { sum += heights[x, y - step / 2]; count++; }
                        if (y + step / 2 < pointsPerSide) { sum += heights[x, y + step / 2]; count++; }

                        heights[x, y] = sum / count + (random.NextDouble() * 2 - 1) * randomness * step / size;
                    }
                }

                step /= 2;
                randomness /= 2; // Уменьшение случайности
            }

            return heights;
        }

        private void BuildMesh(double[,] heights, double size)
        {
            int pointsPerSide = heights.GetLength(0);
            double step = size / (pointsPerSide - 1);

            var modelGroup = new Model3DGroup();

            // Построение вершин
            for (int x = 0; x < pointsPerSide - 1; x++)
            {
                for (int y = 0; y < pointsPerSide - 1; y++)
                {
                    // Определяем вершины треугольников
                    var p1 = new Point3D(x * step - size / 2, y * step - size / 2, heights[x, y]);
                    var p2 = new Point3D((x + 1) * step - size / 2, y * step - size / 2, heights[x + 1, y]);
                    var p3 = new Point3D(x * step - size / 2, (y + 1) * step - size / 2, heights[x, y + 1]);
                    var p4 = new Point3D((x + 1) * step - size / 2, (y + 1) * step - size / 2, heights[x + 1, y + 1]);

                    // Добавляем два треугольника
                    AddColoredTriangle(p1, p2, p3, modelGroup);
                    AddColoredTriangle(p2, p4, p3, modelGroup);
                }
            }

            // Устанавливаем модель на сцену
            landscapeModel = new GeometryModel3D
            {
                Geometry = landscapeMesh,
                Material = new DiffuseMaterial(new SolidColorBrush(Colors.Transparent))
            };
            Viewport.Children.Clear();
            Viewport.Children.Add(new ModelVisual3D { Content = modelGroup });
        }

        private void AddColoredTriangle(Point3D p1, Point3D p2, Point3D p3, Model3DGroup modelGroup)
        {
            // Создаем треугольник
            var mesh = new MeshGeometry3D();
            mesh.Positions.Add(p1);
            mesh.Positions.Add(p2);
            mesh.Positions.Add(p3);

            mesh.TriangleIndices.Add(0);
            mesh.TriangleIndices.Add(1);
            mesh.TriangleIndices.Add(2);

            // Вычисляем среднюю высоту для выбора цвета
            var avgHeight = (p1.Z + p2.Z + p3.Z) / 3;
            var color = GetColorBasedOnHeight(avgHeight);

            // Применяем цвет
            var material = new DiffuseMaterial(new SolidColorBrush(color));
            modelGroup.Children.Add(new GeometryModel3D(mesh, material));
        }


        private void CenterLandscape(double size)
        {
            Camera.Position = new Point3D(0, -size, size);
            Camera.LookDirection = new Vector3D(0, size, -size);
        }
    }
}   