RIR.Peap = function(input) {
  const packet = RIR.Core.filter(input)
  return RIR.Core.return(packet)
}
