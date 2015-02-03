angular.module('breakingBad', [])
    .controller("bbCtrl", ['$scope', function ($scope) {
        $scope.name = "Breaking Bad";
        $scope.count = 0;
        $scope.disabled = true;

        $scope.tryAgain = function() {
                        if($scope.count == 15){
                            $scope.count = 0;
                        } else {
                            $scope.count++;
                        }
                     }

    }])
    .directive('ngBreakingBad', function () {
        return{
            restrict: "AE",
            replace: true,
            link: function (scope, element) {
                
                scope.$watch('[name , count]', function () {
                    var name = scope.name.replace(/[^a-zA-Z ]/g, '');
                    var names =  name.split(" ");
                    if(names.length >= 2){
                        scope.disabled = false;
                        var first = breakBad(names[0], scope.count);
                        var last = breakBad(names[1], scope.count);
                        var html = "<div id='breaking-bad'><div id='bb-body'>"+
                                       "<div class='name first'>"
                                       +first+
                                       "</div><div class='name last'>"
                                       +last+
                                        "</div></div></div>";
                        
                    }else{
                        scope.disabled = true;
                        var html = "<div id='breaking-bad'></div>";
                    }
                    element.html(html);
                });

                // Array of all Elements
                var elements = ['Ac','Ag','Al','Am','Ar','As','At','Au',
                                'B','Ba','Be','Bh','Bi','Bk','Br',
                                'C','Ca','Cd','Ce','Cf','Cl','Cm','Cn','Co','Cr','Cs','Cu',
                                'Db','Ds','Dy',
                                'Er','Es','Eu',
                                'F','Fe','Fl','Fm','Fr',
                                'Ga','Gd','Ge',
                                'H','He','Hf','Hg','Ho','Hs',
                                'I','In','Ir',
                                'K','Kr',
                                'La','Li','Lr','Lu','Lv',
                                'Md','Mg','Mn','Mo','Mt',
                                'N','Na','Nb','Nd','Ne','Ni','No','Np',
                                'O','Os',
                                'P','Pa','Pb','Pd','Pm','Po','Pr','Pt','Pu',
                                'Ra','Rb','Re','Rf','Rg','Rh','Rn','Ru',
                                'S','Sb','Sc','Se','Sg','Si','Sm','Sn','Sr',
                                'Ta','Tb','Tc','Te','Th','Ti','Tl','Tm',
                                'U','Uuo','Uup','Uus','Uut',
                                'V',
                                'W',
                                'Xe',
                                'Y','Yb',
                                'Zn','Zr'];

                // Search the element in the name
                function breakBad(name, num){
                    name = name.toLowerCase();
                    if(name.length < 3){
                        return '';
                    }
                    
                    var userElements = [];
                    r = name;
                    for(i=0; i<elements.length; i++){

                        // Let's not match single character elements.
                        /*if(elements[i].length < 2) {
                            continue;
                        }*/

                        // Does this element occur?
                        symbol = elements[i].toLowerCase(),
                        index = name.indexOf(symbol);

                        // Nope!
                        if(index === -1) {
                            continue;
                        } else if(num > 0) {
                            num -= 1;
                            continue;
                        }

                        // Yep!
                        //userElements.push(this._elements[i].name);
                        r = generate(name, elements[i] , index);
                        break;
                    }
                    if(r == name){
                        r = breakBad(name, num-1);
                    }

                    return r;


                }

                // Genrate the required HTML o/p
                function generate(text, symbol, imdex){
                    return "<div class='left'>"+text.slice(0, index)+ "</div>" +
                           "<div class='element'><img  src='elements/" + symbol + ".png'/></div>" + 
                           "<div class='right'>" + text.slice(index + symbol.length, text.length) +
                           "</div>";
                }

                //console.log($scope.name);
            }
        };
    })