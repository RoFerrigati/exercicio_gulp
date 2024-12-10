const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const obfuscate = require('gulp-obfuscate');
const imagemin = require('gulp-imagemin');
const del = require('del');

// Limpar diretórios
function clean() {
    return del(['./build/**/*']);
};

// Compilar SCSS
function compilaSass() {
    console.log('Compilando arquivos SCSS...');
    return gulp.src('./source/styles/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./build/styles'))
        .on('end', () => console.log('CSS compilado com sucesso!'));
};

// Minificar e ofuscar JavaScript
function compriJavaScript() {
    console.log('Minificando JavaScript...');
    return gulp.src('./source/scripts/*.js')
        .pipe(uglify())
        .pipe(obfuscate())
        .pipe(gulp.dest('./build/scripts'))
        .on('end', () => console.log('JavaScript processado com sucesso!'));
};

// Compactar Imagens
function comprimeImagens() {
    console.log('Compactando imagens...');
    return gulp.src('./source/images/**/*.{png,jpg,jpeg,gif,svg}')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/images'))
        .on('end', () => console.log('Imagens compactadas com sucesso!'));
};

// Tarefa padrão
exports.default = gulp.series(clean, gulp.parallel(compilaSass, compriJavaScript, comprimeImagens), function watchFiles() {
    gulp.watch('./source/styles/*.scss', compilaSass);
    gulp.watch('./source/scripts/*.js', compriJavaScript);
    gulp.watch('./source/images/**/*.{png,jpg,jpeg,gif,svg}', comprimeImagens);
});
