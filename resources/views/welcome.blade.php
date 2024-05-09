<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
        <title>Laravel</title>
    </head>
    <body>
    <header>
        <h1 class="h6 bg-success text-white py-2 ps-2 m-0">静岡県で多くの犬の命を救いたいです</h1>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <ul class="navbar-nav">
                @if (Route::has('login'))
                    @auth
                        <li class="nav-item"><a class="nav-link" href="{{ url('/dashboard') }}">マイページ</a></li>
                    @else
                        <li class="nav-item"><a class="nav-link" href="{{ route('login') }}">ログイン</a></li>
                        @if (Route::has('register'))
                            <li class="nav-item"><a class="nav-link" href="{{ route('register') }}">無料会員登録</a></li>
                        @endif
                    @endauth
                @endif
                <!-- <li class="nav-item"><a class="nav-link" href="#">お知らせ</a></li> -->
                <li class="nav-item"><a class="nav-link" href="/terms-of-service">利用規約</a></li>
                <li class="nav-item"><a class="nav-link" href="#">お問い合わせ</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <section class="container">
            <h1 class="h4 text-center my-3">里親探し中のワンチャンが沢山います</h1>
            <div class="row m-auto">
                @forelse ($dogs as $dog)
                    <div class="card col-md-3 col-xs-6 ms-auto me-auto mb-5 p-0" style="width: 18rem;">
                        <img src="{{ $dog->imageUrl }}" class="card-img-top" alt="{{ $dog->title }}">
                        <div class="card-body">
                            <h5 class="card-title">{{ $dog->title }} / {{ $dog->petLimitDate }}</h5>
                            <p class="card-text">{{ $dog->petSubCategory }} / {{ $dog->petSex }} / {{ $dog->petArea }}</p>
                            <a href="{{ $dog->link }}" class="btn btn-primary">ワンちゃんの詳細を見る</a>
                        </div>
                    </div>
                @empty
                    <p>現在里親を探しているワンちゃんはいないみたいです。</p>
                @endforelse
            </div><!-- /.row -->
        </section>
    </main>
    <footer class="bg-success text-white py-2">
        <p class="text-center m-0">&copy; 里親募集掲示板 2024 <?= date('Y') != 2024 ? '-' . date('Y') : '' ?></p>
    </footer>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossorigin="anonymous"></script>
    </body>
</html>
