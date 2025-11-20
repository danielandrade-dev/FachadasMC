<?php
require_once __DIR__ . '/vendor/autoload.php';

use Twig\Environment;
use Twig\Loader\FilesystemLoader;
use Twig\TwigFunction;

// Configuração do Twig
$loader = new FilesystemLoader(__DIR__ . '/templates');
$twig = new Environment($loader, [
    'cache' => __DIR__ . '/cache',
    'debug' => true,
    'auto_reload' => true,
]);

// Função helper para assets
$twig->addFunction(new TwigFunction('asset', function ($path) {
    $basePath = '/public/assets/';
    return $basePath . ltrim($path, '/');
}));

// Função helper para URL
$twig->addFunction(new TwigFunction('url', function ($path = '') {
    $baseUrl = rtrim($_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['HTTP_HOST'] . dirname($_SERVER['SCRIPT_NAME']), '/');
    return $baseUrl . '/' . ltrim($path, '/');
}));

// Dados do site
$siteData = [
    'siteName' => 'Fachadas MC',
    'description' => 'Especialistas em limpeza de fachadas, oferecendo soluções completas para preservar e valorizar seu patrimônio.',
    'phone' => '(11) 96091-3933',
    'email' => 'contato@fachadasmc.com.br',
    'address' => 'Pirituba - São Paulo, SP',
    'url' => 'https://fachadasmc.com.br',
    'hero' => [
        'title' => 'Limpeza de Fachadas Alta Qualidade em SP',
        'description' => 'Uma década de excelência em limpeza de fachadas'
    ],
    'workingHours' => [
        [
            'days' => 'Segunda a Sexta',
            'hours' => '8h às 18h'
        ],
        [
            'days' => 'Sábado',
            'hours' => '8h às 12h'
        ],
        [
            'days' => 'Domingo',
            'hours' => 'Fechado'
        ]
    ],
    'contact' => [
        'phone' => '(11) 96091-3933',
        'email' => 'contato@fachadasmc.com.br',
        'address' => 'Pirituba - São Paulo, SP',
        'workingHours' => 'Segunda a Sexta: 8h às 18h'
    ],
    'services' => [
        [
            'id' => 1,
            'title' => 'Limpeza de Fachadas',
            'description' => 'Resultados imediatos e duradouros para vidro, concreto, granito e outras superfícies.',
            'image' => '/images/servicos/hidrojateamento_breezes.jpg',
            'features' => [
                'Limpeza de Vidros',
                'Remoção de Sujeira e Poluição',
                'Tratamento de Chuva Acida'
            ]
        ],
        [
            'id' => 2,
            'title' => 'Polimento de ACM',
            'description' => 'Recuperamos o Brilho e a Beleza do seu Revestimento.',
            'image' => '/images/servicos/polimento.jpg',
            'features' => [
                'Polimento Profissional',
                'Revitalização da Superfície',
            ]
        ],
        [
            'id' => 4,
            'title' => 'Vedação de Vidros',
            'description' => 'Acabe Com As Infiltrações E Garanta A Proteção Da Sua Fachada.',
            'image' => '/images/servicos/vidro_vedacao.jpg',
            'features' => [
                'Vedação com Selante PU',
                'Reparos de Infiltrações',
                'Manutenção Preventiva'
            ]
        ],
        [
            'id' => 5,
            'title' => 'Limpeza de Fachadas em Pele de Vidro',
            'description' => 'Limpeza de estruturas em pele de vidro, garantindo transparência e durabilidade.',
            'image' => '/images/servicos/limpeza_pele_de_vidros.jpg',
            'features' => [
                'Verificação de Infiltrações',
                'Tratamento de Manchas'
            ]
        ],
        [
            'id' => 6,
            'title' => 'Hidrojateamento de Fachada',
            'description' => 'Removemos Sujidades Persistentes com Eficiência, Sem Danificar Sua Fachada.',
            'image' => '/images/servicos/hidrojateamento.jpg',
            'features' => [
                'Limpeza com Equipamento de Alta Pressão',
                'Remoção de Sujidades Persistentes',
                'Aplicação de Produtos Químicos Específicos para Cada Superfície'
            ]
        ],
        [
            'id' => 8,
            'title' => 'Instalação de Ancoragem e Linha de Vida',
            'description' => 'Instalamos Sistemas de Proteção, para Trabalhos em Altura, Garantindo a Segurança da Sua Equipe e Conformidade com as Normas NR-35. Oferecemos Soluções Personalizadas para Cada Tipo de Fachada.',
            'image' => '/images/servicos/limpeza_vidros.jpg',
            'gallery' => [
                [
                    'image' => '/images/servicos/ancoragem/ancoragem-1.jpg',
                    'title' => 'Sistema de Ancoragem Permanente',
                    'description' => 'Instalação de linha de vida permanente em aço inox'
                ],
                [
                    'image' => '/images/servicos/ancoragem/ancoragem-4.jpg',
                    'title' => 'Postes de Ancoragem',
                    'description' => 'Postes fabricados conforme NBR 16325'
                ],
                [
                    'image' => '/images/servicos/ancoragem/ancoragem-2.jpg',
                    'title' => 'Teste de Resistência',
                    'description' => 'Ensaio de arrancamento estático com laudo'
                ],
                [
                    'image' => '/images/servicos/ancoragem/ancoragem-3.jpg',
                    'title' => 'Instalação Profissional',
                    'description' => 'Equipe técnica especializada em instalação'
                ]
            ],
            'features' => [
                'Sistema completo de segurança com certificação NR-35',
                'Instalação rápida por equipe especializada',
                'Laudo técnico detalhado com memorial de cálculo',
                'Fabricação de postes conforme NBR 16325',
                'Materiais em aço inox ASTM A351',
                'Suporte técnico 24/7 para sua equipe',
                'Treinamento completo de utilização',
                'Manutenção preventiva mensal',
                'Sistemas permanentes e temporários',
                'Projeto personalizado para sua fachada',
                'ART (Anotação de Responsabilidade Técnica) garantida',
                'Engenharia responsável pelo projeto'
            ]
        ]
    ],
    'whyChooseUs' => [
        'investimento' => [
            'title' => 'INVESTIMENTO',
            'items' => [
                'Melhor Custo-Benefício',
                'Economia de Tempo de Serviço',
                'Produtos Profissionais',
                'Consumo de Água Reduzido'
            ]
        ],
        'equipe' => [
            'title' => 'EQUIPE QUALIFICADA',
            'items' => [
                'Profissionais Certificados',
                'Acesso Por Corda Níveis 01, 02 e 03',
                'Operadores de Plataformas Elevatórias',
                'Profissionais NR 35 e NR 18'
            ]
        ],
        'seguranca' => [
            'title' => 'SEGURANÇA EPI',
            'items' => [
                'Equipamentos Profissionais com CA',
                'Equipe Uniformizada'
            ]
        ],
        'garantias' => [
            'title' => 'GARANTIAS LEGAIS',
            'items' => [
                'Técnico de Segurança do Trabalho',
                'Contrato de Garantia de Satisfação',
                'ARTs Assinadas Por Engenheiro Credenciado Junto ao CREA'
            ]
        ]
    ],
    'stats' => [
        'projetos' => '500+',
        'experiencia' => '10+',
        'clientes' => '300+',
        'satisfacao' => '98%'
    ],
    'metrics' => [
        [
            'id' => 'projects',
            'value' => '500+',
            'label' => 'Projetos Concluídos',
        ],
        [
            'id' => 'experience',
            'value' => '10+',
            'label' => 'Anos de Experiência',
        ],
        [
            'id' => 'clients',
            'value' => '300+',
            'label' => 'Clientes Satisfeitos',
        ],
        [
            'id' => 'satisfaction',
            'value' => '98',
            'label' => 'Satisfação dos Clientes',
        ],
    ],
    'about' => [
        'title' => 'Sobre a Fachadas MC',
        'description' => 'Somos uma empresa especializada em limpeza de fachadas, com mais de 10 anos de experiência no mercado. Nossa missão é oferecer soluções completas e personalizadas para cada cliente.',
        'mission' => 'Proporcionar serviços de excelência em limpeza de fachadas, garantindo a satisfação total de nossos clientes e a preservação do patrimônio.',
        'vision' => 'Ser referência nacional em serviços de limpeza de fachadas, reconhecida pela qualidade, inovação e compromisso com o meio ambiente.',
        'values' => [
            'Excelência no atendimento',
            'Compromisso com a qualidade',
            'Respeito ao meio ambiente',
            'Inovação constante',
            'Ética e transparência'
        ],
        'image' => '/images/about.jpg',
    ],
    'portfolioImages' => [
        ['src' => '/images/galeria/6.jpg', 'alt' => 'Descrição da Imagem 6'],
        ['src' => '/images/galeria/7.jpg', 'alt' => 'Descrição da Imagem 7'],
        ['src' => '/images/galeria/8.jpg', 'alt' => 'Descrição da Imagem 8'],
        ['src' => '/images/galeria/9.jpg', 'alt' => 'Descrição da Imagem 9'],
        ['src' => '/images/galeria/10.jpg', 'alt' => 'Descrição da Imagem 10'],
        ['src' => '/images/galeria/11.jpg', 'alt' => 'Descrição da Imagem 11'],
        ['src' => '/images/galeria/12.jpg', 'alt' => 'Descrição da Imagem 12'],
        ['src' => '/images/galeria/13.jpg', 'alt' => 'Descrição da Imagem 13'],
        ['src' => '/images/galeria/14.jpg', 'alt' => 'Descrição da Imagem 14'],
        ['src' => '/images/galeria/15.jpg', 'alt' => 'Descrição da Imagem 15'],
        ['src' => '/images/galeria/16.jpg', 'alt' => 'Descrição da Imagem 16'],
        ['src' => '/images/galeria/17.jpg', 'alt' => 'Descrição da Imagem 17'],
        ['src' => '/images/galeria/18.jpg', 'alt' => 'Descrição da Imagem 18'],
        ['src' => '/images/galeria/19.jpg', 'alt' => 'Descrição da Imagem 19'],
        ['src' => '/images/galeria/20.jpg', 'alt' => 'Descrição da Imagem 20'],
        ['src' => '/images/galeria/21.jpg', 'alt' => 'Descrição da Imagem 21'],
    ],
    'serviceAreas' => [
        'Osasco',
        'Guarulhos',
        'Jundiaí',
        'Alphaville',
        'Barueri',
        'Granja Vianna',
    ],
    'rotatingKeywords' => [
        ['text' => 'Limpeza de Fachada', 'href' => '#servicos'],
        ['text' => 'Limpeza de Vidros', 'href' => '#servicos-pele-vidro'],
        ['text' => 'Limpeza de ACM', 'href' => '#servicos-acm'],
        ['text' => 'Ancoragem', 'href' => '#servicos-ancoragem'],
        ['text' => 'Linha de Vida', 'href' => '#servicos-ancoragem']
    ]
];

// Roteamento simples
$route = $_GET['page'] ?? 'index';

$templateMap = [
    'index' => 'index.twig',
    'servicos' => 'servicos.twig',
    'sobre' => 'sobre.twig',
    'contato' => 'contato.twig'
];

$template = $templateMap[$route] ?? 'index.twig';

try {
    echo $twig->render($template, $siteData);
} catch (\Exception $e) {
    echo "Erro ao carregar template: " . $e->getMessage();
}

